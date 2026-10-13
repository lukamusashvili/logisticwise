const gql = String.raw;

const VARIANT_FIELDS = gql`
    fragment VariantFields on ProductVariant {
        legacyResourceId
        title
        inventoryQuantity
        inventoryItem {
            legacyResourceId
        }
    }
`;

// variants(first: 10) keeps a 25 product page under Shopify's 1000 query cost limit,
// the rest of the variants are fetched by getRemainingVariants
const PRODUCT_FIELDS = gql`
    fragment ProductFields on Product {
        id
        legacyResourceId
        title
        variants(first: 10) {
            nodes {
                ...VariantFields
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
    ${VARIANT_FIELDS}
`;

async function getRemainingVariants(shop, token, productId, after) {
    const query = gql`
        query GetProductVariants($id: ID!, $after: String) {
            product(id: $id) {
                variants(first: 250, after: $after) {
                    nodes {
                        ...VariantFields
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                }
            }
        }
        ${VARIANT_FIELDS}
    `;

    let allVariants = [];
    let hasNextPage = true;

    while (hasNextPage) {
        const response = await fetch(shop, {
            method: "POST",
            body: JSON.stringify({
                query,
                variables: { id: productId, after },
            }),
            headers: {
                "X-Shopify-Access-Token": token,
                "Content-Type": "application/json",
            },
        });
        const queryResponse = await response.json();
        // 1. Handle top-level GraphQL errors
        if (queryResponse?.errors && queryResponse.errors.length > 0) {
            throw new Error(
                [].concat(queryResponse.errors).map((e) => e.message || e).join("; ")
            );
        }
        // 2. Handle missing data or query response
        const variantsData = queryResponse?.data?.product?.variants;
        if (!variantsData) {
            throw new Error("Unexpected response structure from Shopify API");
        }

        allVariants = allVariants.concat(variantsData.nodes);

        hasNextPage = variantsData.pageInfo.hasNextPage;
        after = variantsData.pageInfo.endCursor;
    }
    return allVariants;
}

// Loads every variant of the product and maps the fields LogisticsWise uses to the REST Admin API shape
async function toRestProduct(shop, token, product) {
    let variants = product.variants.nodes;
    if (product.variants.pageInfo.hasNextPage) {
        variants = variants.concat(
            await getRemainingVariants(
                shop,
                token,
                product.id,
                product.variants.pageInfo.endCursor
            )
        );
    }

    const productId = Number(product.legacyResourceId);

    return {
        id: productId,
        title: product.title,
        variants: variants.map((variant) => ({
            id: Number(variant.legacyResourceId),
            product_id: productId,
            title: variant.title,
            inventory_item_id: Number(variant.inventoryItem.legacyResourceId),
            inventory_quantity: variant.inventoryQuantity,
        })),
    };
}

module.exports = { PRODUCT_FIELDS, toRestProduct };

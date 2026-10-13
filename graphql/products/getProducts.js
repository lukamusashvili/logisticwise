const { PRODUCT_FIELDS, toRestProduct } = require("./productFields");
const gql = String.raw;

async function getProducts(shop, token) {
    const query = gql`
        query GetProducts($first: Int!, $after: String) {
            products(first: $first, after: $after) {
                nodes {
                    ...ProductFields
                }
                pageInfo {
                    hasNextPage
                    endCursor
                }
            }
        }
        ${PRODUCT_FIELDS}
    `;

    let allProducts = [];
    let hasNextPage = true;
    let after = null;
    const pageSize = 25; // nested variants keep query cost under Shopify's 1000 limit

    try {
        while (hasNextPage) {
            const response = await fetch(shop, {
                method: "POST",
                body: JSON.stringify({
                    query,
                    variables: { first: pageSize, after },
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
            if (!queryResponse?.data) {
                throw new Error("Unexpected response structure from Shopify API");
            }
            const productsData = queryResponse.data.products;
            if (!productsData) break;

            for (const product of productsData.nodes) {
                allProducts.push(await toRestProduct(shop, token, product));
            }

            hasNextPage = productsData.pageInfo.hasNextPage;
            after = productsData.pageInfo.endCursor;
        }
        return { products: allProducts };
    } catch (error) {
        throw error;
    }
}

module.exports = getProducts;

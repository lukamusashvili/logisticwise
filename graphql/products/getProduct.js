const { PRODUCT_FIELDS, toRestProduct } = require("./productFields");
const gql = String.raw;

async function getProduct(shop, token, id) {
    const query = gql`
    query GetProductDetails {
        product(id:"gid://shopify/Product/${id}") {
            ...ProductFields
        }
    }
    ${PRODUCT_FIELDS}
  `;

    try {
        const response = await fetch(shop, {
            method: "POST",
            body: JSON.stringify({
                query,
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
        const data = queryResponse.data.product;
        if (!data) return null;
        return { product: await toRestProduct(shop, token, data) };
    } catch (error) {
        throw error;
    }
}

module.exports = getProduct;

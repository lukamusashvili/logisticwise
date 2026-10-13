const { randomUUID } = require("crypto");
const gql = String.raw;

async function updateInventoryItemQuantity(shop, token, inventoryItemId, quantity) {
    const locationQuery = gql`
        query GetPrimaryLocation {
            location {
                id
            }
        }
    `;

    const updateMutation = gql`
        mutation inventorySetQuantities($input: InventorySetQuantitiesInput!, $idempotencyKey: String!) {
            inventorySetQuantities(input: $input) @idempotent(key: $idempotencyKey) {
                inventoryAdjustmentGroup {
                    id
                    changes {
                        name
                        delta
                    }
                }
                userErrors {
                    message
                    code
                    field
                }
            }
        }
    `;

    const headers = {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
    };

    try {
        const locationResponse = await fetch(shop, {
            method: "POST",
            body: JSON.stringify({ query: locationQuery }),
            headers,
        });
        const queryResponse = await locationResponse.json();
        // 1. Handle top-level GraphQL errors
        if (queryResponse?.errors && queryResponse.errors.length > 0) {
            throw new Error(
                [].concat(queryResponse.errors).map((e) => e.message || e).join("; ")
            );
        }
        // 2. Handle missing data or query response
        const locationId = queryResponse?.data?.location?.id;
        if (!locationId) {
            throw new Error("Unexpected response structure from Shopify API");
        }

        const input = {
            reason: "correction",
            ignoreCompareQuantity: true,
            name: "available",
            quantities: [
                {
                    inventoryItemId: String(inventoryItemId).startsWith("gid://")
                        ? inventoryItemId
                        : `gid://shopify/InventoryItem/${inventoryItemId}`,
                    locationId,
                    quantity: Number(quantity),
                },
            ],
        };

        const response = await fetch(shop, {
            method: "POST",
            body: JSON.stringify({
                query: updateMutation,
                variables: { input, idempotencyKey: randomUUID() },
            }),
            headers,
        });
        const mutationResponse = await response.json();
        // 1. Handle top-level GraphQL errors
        if (mutationResponse?.errors && mutationResponse.errors.length > 0) {
            throw new Error(
                [].concat(mutationResponse.errors).map((e) => e.message || e).join("; ")
            );
        }
        // 2. Handle missing data or mutation response
        const inventorySetQuantities = mutationResponse?.data?.inventorySetQuantities;
        if (!inventorySetQuantities) {
            throw new Error("Unexpected response structure from Shopify API");
        }
        // 3. Handle userErrors from the mutation
        if (inventorySetQuantities.userErrors && inventorySetQuantities.userErrors.length > 0) {
            throw new Error(
                inventorySetQuantities.userErrors.map((e) => e.message).join("; ")
            );
        }

        return inventorySetQuantities;
    } catch (error) {
        throw error;
    }
}

module.exports = updateInventoryItemQuantity;

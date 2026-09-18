// TODO: confirm these with the PHP dev once the endpoint exists.
const CREDENTIALS_URL =
    "https://platform.logisticswise.ge/api/shopify_receive_client_info";
const RECEIVE_TOKEN_URL =
    "https://platform.logisticswise.ge/api/shopify_receive_token";

async function getShopCredentials(shop) {
    const response = await fetch(CREDENTIALS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shop_name: shop }),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch credentials for ${shop}: ${response.status}`,
        );
    }

    const { client_id, client_secret } = await response.json();
    return { clientId: client_id, clientSecret: client_secret };
}

async function exchangeAccessToken(shop, idToken, clientId, clientSecret) {
    const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
            subject_token: idToken,
            subject_token_type: "urn:ietf:params:oauth:token-type:id_token",
            requested_token_type:
                "urn:shopify:params:oauth:token-type:offline-access-token",
        }),
    });

    const { access_token } = await response.json();
    return access_token;
}

function sendTokenToPlatform(shop, accessToken) {
    return fetch(RECEIVE_TOKEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shop_name: shop, shop_token: accessToken }),
    });
}

async function getOfflineAccessToken(shop, idToken) {
    const { clientId, clientSecret } = await getShopCredentials(shop);
    const accessToken = await exchangeAccessToken(
        shop,
        idToken,
        clientId,
        clientSecret,
    );

    if (accessToken) {
        sendTokenToPlatform(shop, accessToken).catch((error) => {
            console.error(`Failed to send token for ${shop}:`, error.message);
        });
    }

    return accessToken;
}

module.exports = { getOfflineAccessToken };

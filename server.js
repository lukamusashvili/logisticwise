require("isomorphic-fetch");
const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const { koaBody } = require("koa-body");
const { getOfflineAccessToken } = require("./utils/shopifyAuth");
const getProduct = require("./graphql/products/getProduct");
const getProducts = require("./graphql/products/getProducts");
const updateInventoryItemQuantity = require("./graphql/inventory/updateInventoryItemQuantity");

const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();
    const handleRequest = async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    };

    router.get("/", async (ctx) => {
        const { shop, id_token } = ctx.query;

        if (shop && id_token) {
            try {
                await getOfflineAccessToken(shop, id_token);
            } catch (error) {
                console.error("Token exchange failed:", error.message);
            }
        }

        await handleRequest(ctx);
    });

    router.post("/orders", koaBody(), async (ctx) => {
        const url = "https://platform.logisticswise.ge/api/shopify_place_order";
        const mergedJSON = { ...ctx.request.headers, ...ctx.request.body };
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(mergedJSON),
        }).then((response) => response.json());

        ctx.body = { message: "Success" };
    });

    router.put("/quantity", koaBody(), async (ctx) => {
        const { shopName, shopToken, inventory_item_id, available } =
            ctx.request.body;

        try {
            ctx.body = await updateInventoryItemQuantity(
                `https://${shopName}/admin/api/2026-07/graphql.json`,
                shopToken,
                inventory_item_id,
                available,
            );
        } catch (error) {
            ctx.status = 500;
            ctx.body = `Internal server error: ${error.message}`;
        }
    });

    router.post("/product", koaBody(), async (ctx) => {
        const { shopName, shopToken, productID } = ctx.request.body;

        try {
            const productDetails = await getProduct(
                `https://${shopName}/admin/api/2026-07/graphql.json`,
                shopToken,
                productID,
            );

            if (!productDetails) {
                ctx.status = 404;
                ctx.body = "Error fetching product details: Not Found";
                return;
            }

            ctx.body = productDetails;
        } catch (error) {
            ctx.status = 500;
            ctx.body = `Internal server error: ${error.message}`;
        }
    });

    router.post("/products", koaBody(), async (ctx) => {
        const { shopName, shopToken } = ctx.request.body;

        try {
            ctx.body = await getProducts(
                `https://${shopName}/admin/api/2026-07/graphql.json`,
                shopToken,
            );
        } catch (error) {
            ctx.status = 500;
            ctx.body = `Internal server error: ${error.message}`;
        }
    });

    router.get("(/_next/static/.*)", handleRequest);
    router.get("/_next/webpack-hmr", handleRequest);
    router.get("(.*)", handleRequest);

    server.use(router.allowedMethods());
    server.use(router.routes());

    server.listen(3000, () => {
        console.log(`> Ready on http://localhost:${3000}`);
    });
});

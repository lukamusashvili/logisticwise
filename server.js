require("isomorphic-fetch");
const dotenv = require("dotenv");
dotenv.config();
const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const { koaBody } = require("koa-body");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
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
		var shop = ctx.query.shop;
		await handleRequest(ctx);
	});

	router.post("/orders", koaBody(), async (ctx) => {
		const url = "https://platform.logisticswise.ge/api/shopify_place_order";
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(ctx.request.headers, ctx.request.body),
		}).then((response) => response.json());

		ctx.body = { message: "Success" };
	});

	router.put("/quantity", koaBody(), async (ctx) => {
		const shopName = ctx.request.body.shopName;
		const shopToken = ctx.request.body.shopToken;
		const inventory_item_id = ctx.request.body.inventory_item_id;
		const available = ctx.request.body.available;

		try {
			const response = await fetch(`https://${shopName}/admin/api/2024-04/shop.json`, {
				headers: {
					"X-Shopify-Access-Token": shopToken,
				},
			});

			if (!response.ok) {
				ctx.status = response.status;
				ctx.body = `Error fetching shop details: ${response.statusText}`;
				return;
			}

			const shopDetails = await response.json();
			const locationId = shopDetails.shop.primary_location_id;

			try {
				const response = await fetch(`https://${shopName}/admin/api/2024-04/inventory_levels/set.json`, {
					method: "POST",
					body: JSON.stringify({
						location_id: locationId,
						inventory_item_id: inventory_item_id,
						available: available,
					}),
					headers: {
						"X-Shopify-Access-Token": shopToken,
						"Content-Type": "application/json",
					},
				});

				if (!response.ok) {
					ctx.status = response.status;
					ctx.body = `Error adjusting inventary levels: ${response.statusText}`;
					return;
				}

				const shopDetails = await response.json();
				ctx.body = shopDetails;
			} catch (error) {
				ctx.status = 500;
				ctx.body = `Internal server error: ${error.message}`;
			}
		} catch (error) {
			ctx.status = 500;
			ctx.body = `Internal server error: ${error.message}`;
		}
	});

	router.post("/product", koaBody(), async (ctx) => {
		const shopName = ctx.request.body.shopName;
		const shopToken = ctx.request.body.shopToken;
		const productID = ctx.request.body.productID;

		try {
			const response = await fetch(`https:/${shopName}/admin/api/2024-04/products/${productID}.json`, {
				headers: {
					"X-Shopify-Access-Token": shopToken,
				},
			});

			if (!response.ok) {
				ctx.status = response.status;
				ctx.body = `Error fetching product details: ${response.statusText}`;
				return;
			}

			const productDetails = await response.json();
			ctx.body = productDetails;
		} catch (error) {
			ctx.status = 500;
			ctx.body = `Internal server error: ${error.message}`;
		}
	});

	router.post("/products", koaBody(), async (ctx) => {
		const shopName = ctx.request.body.shopName;
		const shopToken = ctx.request.body.shopToken;

		try {
			const response = await fetch(`https:/${shopName}/admin/api/2024-04/products.json`, {
				headers: {
					"X-Shopify-Access-Token": shopToken,
				},
			});

			if (!response.ok) {
				ctx.status = response.status;
				ctx.body = `Error fetching product details: ${response.statusText}`;
				return;
			}

			const productDetails = await response.json();
			ctx.body = productDetails;
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

	console.log("It's a Development Server");
	server.listen(3000, () => {
		console.log(`> Ready on http://localhost:${3000}`);
	});
});

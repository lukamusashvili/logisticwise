const crypto = require("crypto");

function verifyHmac(query, secret) {
	const { hmac, ...params } = query;
	if (!hmac) return false;

	const message = Object.keys(params)
		.sort()
		.map((key) => `${key}=${params[key]}`)
		.join("&");

	const computedHmac = crypto.createHmac("sha256", secret).update(message).digest("hex");

	const a = Buffer.from(hmac);
	const b = Buffer.from(computedHmac);
	return a.length === b.length && crypto.timingSafeEqual(a, b);
}

module.exports = verifyHmac;

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) return res.status(401).send("No token provided");

	try {
		const decodedToken = jwt.verify(
			token,
			config.get("user.jwtPrivateKey")
		);
		req.user = decodedToken;
		next();
	} catch (e) {
		return res.status(400).json(({message: "Invalid token"}));
	}
};

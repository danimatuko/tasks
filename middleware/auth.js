const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.header("x-auth-token");
	if (!token) return res.status(401).send("No token provided");

	try {
		const decodedToken = jwt.verify(token, process.env.jwtPrivateKey);
		req.user = decodedToken;
		next();
	} catch (e) {
		return res.status(400).send("Invalid token");
	}
};

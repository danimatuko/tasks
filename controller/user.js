const { User, validateRegister } = require("../model/User");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const register = async (req, res) => {
	try {
		await validateRegister(req.body);
	} catch (error) {
		return res.status(400).json(error.errors);
	}

	const { firstName, lastName, email, password } = req.body;

	try {
		let user = await User.findOne({ email: email });
		if (user)
			return res.status(400).json({ message: "user already exist" });

		user = new User({
			firstName,
			lastName,
			email,
			password
		});

		// hash password before saving in DB
		const salt = await bycrypt.genSalt(10);
		user.password = await bycrypt.hash(password, salt);

		// create and return a JWT
		payload = {
			email: user.email,
			password: user.password
		};

		const jwtPrivateKey = config.get("user.jwtPrivateKey");

		const token = jwt.sign(payload, jwtPrivateKey);

		await user.save();
		
		// set the token in the header to stay logged in
		res.header("x-auth-token", token);

		res.json({
			message: "Registration compelted succsessfully",
			token: token
		});

	} catch (error) {
		return res.status(500).json({ message: "server error" });
	}
};

module.exports = { register };

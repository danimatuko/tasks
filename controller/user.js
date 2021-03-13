const { User, validateRegister, validateLogin } = require("../model/User");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const register = async (req, res) => {
	// validate input
	try {
		await validateRegister(req.body);
	} catch (error) {
		return res.status(400).json(error.errors);
	}

	const { firstName, lastName, email, password, role } = req.body;

	try {
		let user = await User.findOne({ email: email });
		if (user)
			return res.status(400).json({ message: "user already exist" });

		user = new User({
			firstName,
			lastName,
			email,
			password,
			role
		});

		// hash password before saving in DB
		const salt = await bycrypt.genSalt(10);
		user.password = await bycrypt.hash(password, salt);

		// create and return a JWT
		payload = {
			email: user.email,
			password: user.password,
			role:user.role
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
		return res.status(500).json({ message: error.message });
	}
};

const login = async (req, res) => {
	// validate input
	try {
		await validateLogin(req.body);
	} catch (error) {
		return res.status(400).json(error.errors);
	}
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email: email });

		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid email or password" });
		}

		const isValidPassword = await bycrypt.compare(password, user.password);

		if (!isValidPassword) {
			return res
				.status(400)
				.json({ message: "Invalid email or password" });
		}

		// create and set JWT
		payload = {
			email: user.email,
			password: user.password,
			role:user.role
		};

		const jwtPrivateKey = config.get("user.jwtPrivateKey");
		const token = jwt.sign(payload, jwtPrivateKey);

		// set the token in the header to stay logged in
		res.header("x-auth-token", token);

		return res
			.status(200)
			.json({ message: "You are logged in", token: token });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = { register, login };

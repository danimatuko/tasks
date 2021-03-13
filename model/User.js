const mongoose = require("mongoose");
const yup = require("yup");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	}
});

const User = mongoose.model("User", userSchema);

const registerSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().email().required(),
	password: yup.string().min(6).required(),
	role: yup.string().required()
});

const loginSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required()
});

const validateRegister = (user) => {
	return registerSchema.validate(user, { abortEarly: false });
};

const validateLogin = (user) => {
	return loginSchema.validate(user, { abortEarly: false });
};

module.exports = {
	User,
	validateRegister,
	validateLogin
};

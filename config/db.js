const mongoose = require("mongoose");
const config = require("config");
const connectToDB = () => {
	const connectionString = config.get("db.connectionString");

	mongoose.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	const db = mongoose.connection;

	db.on("error", (err) => console.log("conncection error!!!", err.message));

	db.once("open", () => console.log("Connected to database"));
};

module.exports = connectToDB;

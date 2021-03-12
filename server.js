const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const connectToDB = require("./config/db");

const userRoutes = require("./routes/user");

connectToDB();

app.use(express.json({ extended: false }));

app.use("/user", userRoutes);

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});

const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const connectToDB = require("./config/db");

const userRoutes = require("./routes/user");
const projectRoutes = require("./routes/projectRoutes");

connectToDB();

app.use(express.json({ extended: false }));

app.use("/user", userRoutes);
app.use("/project", projectRoutes);

app.listen(PORT, () => {
	console.log(`server listening at http://localhost:${PORT}`);
});

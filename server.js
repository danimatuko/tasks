const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const connectToDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

connectToDB();

app.use(express.json({ extended: false }));

app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);

app.listen(PORT, () => {
	console.log(`server listening at http://localhost:${PORT}`);
});

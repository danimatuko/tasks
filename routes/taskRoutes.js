const express = require("express");
const router = express.Router();
const { addNewTask } = require("../controller/task");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

router.post("/add", [auth, isAdmin], addNewTask);

module.exports = router;

const express = require("express");
const router = express.Router();
const { addNewProject } = require("../controller/project");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

router.post("/add", [auth, isAdmin], addNewProject);

module.exports = router;

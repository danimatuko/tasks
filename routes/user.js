const express = require("express");
const router = express.Router();
const { register } = require("../controller/user");

router.get("/register", register);

module.exports = router;
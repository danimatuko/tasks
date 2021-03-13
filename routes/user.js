const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/user");

router.get("/register", register);

router.post("/login", login);

module.exports = router;

const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/user");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/admin");

router.post("/register", [auth, isAdmin], register);

router.post("/login", login);


module.exports = router;

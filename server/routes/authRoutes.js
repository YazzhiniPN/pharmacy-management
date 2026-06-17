const {userRegister, userLogin, userLogout, refreshAccessToken} = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("logout", userLogout);
router.post("refresh", refreshAccessToken);

module.exports = router;
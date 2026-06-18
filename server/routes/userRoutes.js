const express = require("express");
const router = express.Router();
const {getUsers, getUser, deleteUser} = require("../controllers/userController");
const { verifyAdmin, verifyToken } = require("../middleware/auth");

router.get("/",verifyToken, verifyAdmin, getUsers);
router.get("/:username", verifyToken, verifyAdmin, getUser);
router.delete("/:username", verifyToken, verifyAdmin, deleteUser);

module.exports = router;
const express = require("express");
const router = express.Router();
const {addSale, getsales, getSale} = require("../controllers/salesController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.post("/", verifyToken, addSale);
router.get("/", verifyToken, verifyAdmin, getsales);
router.get("/:billNumber", verifyToken, getSale);

module.exports = router;
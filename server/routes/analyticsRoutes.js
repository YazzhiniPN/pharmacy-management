const express = require("express");
const router = express.Router();
const {getDailyRevenue, getMonthlyRevenue} = require("../controllers/analyticsController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.get("/daily", verifyToken, verifyAdmin, getDailyRevenue);
router.get("/monthly", verifyToken, verifyAdmin, getMonthlyRevenue);

module.exports = router;

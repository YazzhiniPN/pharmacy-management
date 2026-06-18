const express = require("express");
const router = express.Router();
const {addMedicine, getMedicine, getMedicines, deleteMedicine} = require("../controllers/medicineController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.post("/", verifyToken, verifyAdmin, addMedicine);
router.get("/:name",verifyToken,getMedicine);
router.get("/", verifyToken, verifyAdmin, getMedicines);
router.delete("/:name", verifyToken, verifyAdmin, deleteMedicine);

module.exports = router;
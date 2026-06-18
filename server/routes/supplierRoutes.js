const express = require("express");
const router = express.Router();
const  {addSupplier, getSupplier, getSuppliers, deleteSupplier} = require("../controllers/supplierController");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

router.post("/", verifyToken, verifyAdmin, addSupplier);
router.get("/", verifyToken, verifyAdmin, getSuppliers );
router.get("/:name" , verifyToken, verifyAdmin, getSupplier);
router.delete("/:name", verifyToken, verifyAdmin, deleteSupplier);

module.exports = router;


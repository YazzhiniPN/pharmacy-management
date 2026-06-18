const Medicine = require("../models/Medicine");
const Supplier = require("../models/Supplier");

async function addMedicine(req,res){
    try {

        if(!req.body.name || !req.body.price || !req.body.quantity || !req.body.batchNumber || !req.body.expiryDate || !req.body.supplierName){
            return res.status(400).json({err: "Insufficient Data"});
        }

        const supplier = await Supplier.findOne({supplierName: req.body.supplierName});
        if(!supplier){
            return res.status(404).json({err: "Invalid Supplier"})
        }
        
        const newMedicine = new Medicine({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
            batchNumber: req.body.batchNumber,
            expiryDate: req.body.expiryDate,
            threshold: req.body.threshold,
            supplier: supplier._id,
            supplierName: req.body.supplierName
        })

        await newMedicine.save();

        return res.json({msg: "Medicine Added", medicine: newMedicine});
    } 
    catch (err) {
        return res.status(500).json({err: err.message})
    }
}

module.exports = {addMedicine};
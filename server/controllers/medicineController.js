const Medicine = require("../models/Medicine");
const Supplier = require("../models/Supplier");

async function addMedicine(req,res){
    try {

        if(!req.body.name || !req.body.price || !req.body.quantity || !req.body.batchNumber || !req.body.expiryDate || !req.body.supplierName){
            return res.status(400).json({err: "Insufficient Data"});
        }

        const supplier = await Supplier.findOne({name: req.body.supplierName});
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

async function getMedicine(req,res){
    try {
        const medicine = await Medicine.findOne({name: req.params.name});
        
        if(!medicine){
            return res.status(404).json({err: "Medicine Not found"});
        }

        if(req.user.role === "staff"){
            medicine.supplier = null;
        }

        return res.json({msg: "Medicine found", medicine: medicine});
    } 
    catch (err) {
        return res.status(500).json({err: err.message});
    }
}

async function getMedicines(req,res){
    try {
        const medicines = await Medicine.find();
        return res.json({medicines: medicines});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
}


async function deleteMedicine(req,res){
    try {
        const medicine = await Medicine.findOneAndDelete({name: req.params.name});
        if(!medicine){
            return res.status(404).json({err: "Medicine not found"});
        }
        return res.json({msg: "Medicine deleted", deletedMedicine: medicine});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
}

module.exports = {addMedicine, getMedicine, getMedicines, deleteMedicine};
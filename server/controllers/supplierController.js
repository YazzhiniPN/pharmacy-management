const Supplier = require("../models/Supplier");
const { findOneAndDelete } = require("../models/User");

async function addSupplier(req,res){
    try {
        if(!req.body.name || !req.body.phone || !req.body.email || !req.body.address){
            return res.status(400).json({err: "Insufficient data"});
        }
        const newSupplier = new Supplier({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address
        })

        await newSupplier.save();

        return res.json({msg: "Supplier added", supplier: newSupplier});
    } 
    catch (err) {
        return res.status(500).json({err: err.message});
    }
}

async function getSupplier(req,res){
    try {
        const supplier = await Supplier.findOne({name: req.params.name});
        if(!supplier){
            return res.status(404).json({err: "Supplier Not found"});
        }

        return res.json({msg: "Supplier found", supplier: supplier});
    } 
    catch (err) {
        return res.status(500).json({err: err.message})
    }
}

async function getSuppliers(req,res){
    try {
        const suppliers = await Supplier.find();
        return res.json({suppliers : suppliers});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
}

async function deleteSupplier(req,res){
    try {
        const supplier = await Supplier.findOneAndDelete({name: req.params.name});
        if(!supplier){
            return res.status(404).json({err: "Supplier not found"});
        }

        return res.json({msg: "Supplier deleted", deletedSupplier: supplier});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
}

module.exports = {addSupplier, getSupplier, getSuppliers, deleteSupplier};
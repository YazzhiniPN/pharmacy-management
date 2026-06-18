const Sale = require("../models/Sale");
const User = require("../models/User");
const Medicine = require("../models/Medicine");

async function addSale(req,res){
    try {       
        let totalCost = 0;
        const saleItems = [];

        for(const item of req.body.items){
            const medicine = await Medicine.findOne({name: item.medicineName});
            if(!medicine){
                return res.status(404).json({err: `${item.medicineName} not found`});
            }
            
            if(medicine.quantity < item.quantity){
                return res.status(400).json({err: `Insufficient stock for ${item.medicineName}`});
            }

            totalCost += item.quantity * medicine.price;

            saleItems.push({
                medicine: medicine._id,
                medicineName: medicine.name,
                quantity: item.quantity,
                priceAtSale: medicine.price
            });

            medicine.quantity = medicine.quantity - item.quantity;
            await medicine.save();
        }

        const newSale = new Sale({
            billNumber: `BILL-${Date.now()}`,
            items: saleItems,
            totalAmount: totalCost,
            soldBy: req.user.id,

        })

        await newSale.save();

        return res.json({msg: "Sale added", sale: newSale});
    }
    catch (err) {
        return res.status(500).json({err: err.message});
    }
}

async function getsales(req,res){
    try {
        const sales = await Sale.find();
        return res.json({sales: sales});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
}


async function getSale(req,res){
    try {
        const sale = await Sale.findOne({billNumber: req.params.billNumber});
        if(!sale){
            return res.status(404).json({err: "Sale/Bill Not found"});
        }
        return res.json({msg: "Sale/Bill found", sale: sale});
    } 
    catch (err) {
        return res.status(500).json({err: err.message})
    }
}
module.exports = {addSale, getsales, getSale}
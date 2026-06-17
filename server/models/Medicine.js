const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    batchNumber: {
        type: String,
        required: true
    },
    expiryDate:{
        type: Date,
        required: true
    },
    threshold:{
        type: Number,
        required: true,
        default: 10
    },
    supplierName:{
        type: String
    }
},{
    timestamps: true
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
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
        default: 10
    },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier"
    },
    supplierName:{
        type: String
    }
},{
    timestamps: true
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
    billNumber : {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        medicine: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medicine",
        },
        medicineName:{
            type: String
        },
        quantity: {
            type: Number
        },
        priceAtSale: {
            type: Number
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    soldBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
{
    timestamps: true
});

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
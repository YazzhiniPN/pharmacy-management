const Sale = require("../models/Sale");
const Medicine = require("../models/Medicine");

async function getDailyRevenue(req,res){
    try {
        const now = new Date();
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dailyRevenue = await Sale.aggregate([
            {
                $match:{
                    createdAt: {
                        $gte: startOfDay
                    }
                }
            },
            {
                $group:{
                    _id: null,
                    total: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ])

        return res.json({dailyRevenue: dailyRevenue[0]?.total || 0});
    } 
    catch (err) {
        return res.status(500).json({err: err.message});    
    }
}

async function getMonthlyRevenue(req,res){
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth());
        const monthlyRevenue = await Sale.aggregate([
            {
                $match:{
                    createdAt: {
                        $gte: startOfMonth
                    }
                }
            },
            {
                $group:{
                    _id: null,
                    total: {
                        $sum: "$totalAmount"
                    }
                }
            }
        ])
        return res.json({monthlyRevenue: monthlyRevenue[0]?.total || 0});
    } 
    catch (err) {
        return res.status(500).json({err: err.message});
    }
}

module.exports = {getDailyRevenue, getMonthlyRevenue}
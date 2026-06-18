const cron = require("node-cron");
const Medicine = require("../models/Medicine");

async function checkMedicines(){
    try {
        console.log("Running expiry and stock check");

        const today = new Date();
        const thirtyDaysLater = new Date();
        thirtyDaysLater.setDate(today.getDate() + 30);

        await Medicine.updateMany(
            {expiryDate: {$lte: thirtyDaysLater, $gte: today}},
            {$set: {'alerts.nearExpiry' : true}}
        )

        await Medicine.updateMany(
            {$expr: {$lte: ['$quantity', '$threshold']}},//expr to compare 2 fields from the same doc
            {$set: {'alerts.lowStock' : true}}
        )

        await Medicine.updateMany(
            {expiryDate: {$gt: thirtyDaysLater}},
            {$set: {'alerts.nearExpiry' : false}}
        )

        await Medicine.updateMany(
            {$expr: {$gt: ['$quantity', '$threshold']}},//expr to compare 2 fields from the same doc
            {$set: {'alerts.lowStock' : false}}
        )

        console.log("Check complete");
        
    } catch (err) {
        console.log("Error: ", err);
    }
}

function startCronJob(){
    checkMedicines();

    cron.schedule('0 8 * * *', checkMedicines);
}

module.exports = {startCronJob};
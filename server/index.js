require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const saleRoutes = require("./routes/saleRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const {startCronJob} = require("./utils/cronJob");

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();
startCronJob();

app.get("/",(req,res)=>{
    res.send("Pharmacy Management System");
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server starting running at ${PORT}`);
})
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const app = express();

app.use(express.json());

connectDB();

app.get("/",(req,res)=>{
    res.send("Pharmacy Management System");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server starting running at ${PORT}`);
})
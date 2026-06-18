const User = require("../models/User");

async function getUsers(req,res){
    try {
        const users = await User.find().select("-password -refreshToken");
        return res.json({users: users});
    }
    catch (err) {
        return res.status(500).json({err: err.message});        
    }
}

async function getUser(req,res){
    try {
        const user = await User.findOne({username: req.params.username}).select("-password -refreshToken");
        if(!user){
            return res.status(404).json({err: "User not found"});
        }
        return res.json({msg: "User found", user: user});
    } catch (err) {
        return res.status(500).json({err: err.message});
    }
}

async function deleteUser(req,res){
    try {
        const user = await User.findOneAndDelete({username: req.params.username}).select("username"); //id is given by default
        if(!user){
            return res.status(404).json({err: "User not found"});
        }
        return res.json({msg: "User deleted", deletedUser: user});
    } catch (err) {
        return res.status(500).json({err: err.message})
    }
}

module.exports = {getUsers, getUser, deleteUser}
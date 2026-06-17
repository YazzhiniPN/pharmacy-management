const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function userLogin(req,res){
    try{
        if(!req.body.username || !req.body.password){
            return res.json({err: "Invalid Creddentials"});
        }
        const found = await User.findOne({username: req.body.username});
        if(!found){
            return res.status(403).json({err: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(req.body.password, found.password);
        if(isMatch){
            const accessToken = jwt.sign(
                {
                    id: found._id,
                    role: found.role
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "15m" 
                }
            );

            const refreshToken = jwt.sign(
                {
                    id: found._id,
                },
                process.env.REFRESH_TOKEN_SECRET,
                {
                    expiresIn: "7d"
                }
            );

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 7*24*60*60*1000
            })

            return res.json({
                msg: "Login Successful",
                accessToken,
                user: {
                    username: found.username, 
                    role: found.role
                }
            });
        }
        else{
            return res.status(403).json({
                err: "Invalid credentials"
            })
        }        
    }
    catch(err){
        return res.json({err: err.message})
    }

}

async function userRegister(req,res){
    try{
        if(!req.body.username || !req.body.password){
            return res.json({err: "Invalid credentials"});
        }
        const found = await User.findOne({
            $or: [
                {username: req.body.username},
                {email: req.body.email}
            ]
        });
        if(found){
            return res.json({err: "Username already taken"});
        }
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            role: req.body.role ? req.body.role : "staff",
        })

        await newUser.save();

        res.json({msg: "User created", 
            username: newUser.username, 
            role: newUser.role});
    }
    catch(err){
        return res.json({err: err.message});
    }
}

module.exports = {userRegister, userLogin};
const jwt = require("jsonwebtoken");

function verifyToken(req,res,next){
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({err:"Access Token required"});
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_SECRET_TOKEN
        );

        req.user = decoded;      //this stores the user's info who is logged in and 
                                // it adds it to req, so in the next step, 
                                // we can check if the user is allowed to do that function
        next();
    }
    catch(err){
        return res.status(403).json({err: err.message})
    }
}

function verifyAdmin(req,res,next){
    if(req.user.role !== "admin"){
        return res.status(403).json({err: "Admin Access required"});
    }

    next();
}

module.exports = {verifyToken, verifyAdmin};
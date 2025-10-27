const jwt = require("jsonwebtoken");
const ENV = require("../lib/env");
const User = require("../models/User");

const authMiddleware = async(req, res, next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message: "Unauthorized, no token provided"})
        }
        const decoded = jwt.verify(token, ENV.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: "Unauthorized, invalid token"});
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        req.user = user;
        next();
    }
    catch(error){
        console.error("Error in the authMiddleware", error);
        return res.status(500).json({message: "Internal server error "});
    }
}

module.exports = authMiddleware;
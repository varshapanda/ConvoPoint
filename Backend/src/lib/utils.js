const jwt = require("jsonwebtoken");

const generateToken = (userId, res)=>{
    // with userId we know with user owns which token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"7d"
    });
    res.cookie("jwt", token, {
        maxAge:7*24*60*60*1000,
        httpOnly: true, // Prevents XSS Attacks 
        sameSite: "strict", //Prevents CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false: true,
    });
    return token;
}

module.exports = generateToken;
const jwt = require("jsonwebtoken");
const ENV = require("./env.js");

const generateToken = (userId, res)=>{
    const { JWT_SECRET } = ENV;
    if(!JWT_SECRET){
        throw new Error("JWT SECRET is not configured");
    }
    // with userId we know with user owns which token
    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn:"7d"
    });
    res.cookie("jwt", token, {
        maxAge:7*24*60*60*1000,
        httpOnly: true, // Prevents XSS Attacks 
        sameSite: "strict", //Prevents CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false: true,
    });
    return token;
}

module.exports = generateToken;
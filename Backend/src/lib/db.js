const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const {MONGODB_URL} = process.env;
        if(!MONGODB_URL) throw new Error("MONGODB_URL is not set")
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected successfully, ", connect.connection.host)
    }
    catch(err){
        console.error("MongoDB connection failed, ", err);
        process.exit(1);
    }
}

module.exports = connectDB;
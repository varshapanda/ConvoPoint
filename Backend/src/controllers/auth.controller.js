const bcrypt = require("bcryptjs");
const generateToken = require("../lib/utils.js");
const User = require("../models/User.js");
const sendWelcomeEmail = require("../emails/emailHandlers.js");
const ENV = require("../lib/env.js");

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must contain atleast 6 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json("message: User already exists, try another email");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic
      });
      // Send a welcome email to user
      try{
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL)
      }
      catch(err){
        console.error("Failed to send welcome email", err);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log("Error in signup controller", err);
    res.status(500).json({message: "Something went wrong, Internal server error"});
  }
};

module.exports = signup;

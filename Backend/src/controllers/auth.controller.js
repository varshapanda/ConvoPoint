import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import {
  sendWelcomeEmail,
  sendVerificationEmail,
} from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
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
        .json({ message: "User already exists, try another email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ); // 24 hours

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt,
    });

    if (newUser) {
      const savedUser = await newUser.save();

      res.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
        isVerified: savedUser.isVerified,
        message:
          "Account created successfully. Please check your email to verify your account.",
      });

      // Send verification email
      try {
        await sendVerificationEmail(
          savedUser.email,
          savedUser.fullName,
          verificationToken,
          ENV.CLIENT_URL
        );
      } catch (err) {
        console.error("Failed to send verification email", err);
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    console.log("Error in signup controller", err);
    res
      .status(500)
      .json({ message: "Something went wrong, Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      // Check if user exists with this token but is already verified
      const verifiedUser = await User.findOne({
        verificationToken: token,
        isVerified: true,
      });

      if (verifiedUser) {
        return res.status(400).json({
          message: "Email has already been verified. Please login.",
          alreadyVerified: true,
        });
      }

      return res.status(400).json({
        message: "Invalid or expired verification token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // Generate token and set cookie
    generateToken(user._id, res);

    // Send welcome email
    try {
      await sendWelcomeEmail(user.email, user.fullName, ENV.CLIENT_URL);
    } catch (err) {
      console.error("Failed to send welcome email", err);
    }

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Error in verifyEmail controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiresAt = new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ); // 24 hours

    user.verificationToken = verificationToken;
    user.verificationTokenExpiresAt = verificationTokenExpiresAt;
    await user.save();

    // Send verification email
    try {
      await sendVerificationEmail(
        user.email,
        user.fullName,
        verificationToken,
        ENV.CLIENT_URL
      );
      res.status(200).json({
        success: true,
        message: "Verification email sent successfully",
      });
    } catch (err) {
      console.error("Failed to send verification email", err);
      res.status(500).json({ message: "Failed to send verification email" });
    }
  } catch (error) {
    console.error("Error in resendVerificationEmail controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
        isVerified: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      isVerified: user.isVerified,
    });
  } catch (error) {
    console.error("Error while logging in", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "User logged out successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log("Error while updating profile", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      user: {
        _id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        profilePic: req.user.profilePic,
        isVerified: req.user.isVerified,
      },
    });
  } catch (error) {
    console.error("Error in checkAuth controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

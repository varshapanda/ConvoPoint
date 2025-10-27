const express = require('express');
const {signup, login, logout, updateProfile, checkAuth} = require('../controllers/auth.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
// If a user wants to update their profile, they must be authenticated
router.put("/update-profile",authMiddleware, updateProfile)
router.get("/check", authMiddleware, checkAuth);

module.exports = router;
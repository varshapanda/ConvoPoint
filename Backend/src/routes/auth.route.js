const express = require('express');
const {signup, login, logout, updateProfile, checkAuth} = require('../controllers/auth.controller.js');
const authMiddleware = require('../middleware/auth.middleware.js');
const { default: arcjetMiddleware } = require('../middleware/arcjet.middleware.mjs');

const router = express.Router();
router.use(arcjetMiddleware);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", authMiddleware, updateProfile)
router.get("/check", authMiddleware, checkAuth);

router.get("/test", (req, res)=>{
    res.status(200).json({message: "Test route"});
})

module.exports = router;
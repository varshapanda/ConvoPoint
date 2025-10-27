const express = require("express");
const { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } = require("../controllers/message.controller.js");
const authMiddleware = require("../middleware/auth.middleware.js");
const { default: arcjetMiddleware } = require("../middleware/arcjet.middleware.mjs");
const router = express.Router();

router.use(arcjetMiddleware, authMiddleware);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

module.exports = router;
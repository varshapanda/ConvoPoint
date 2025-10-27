const User = require("../models/User.js");
const Message = require("../models/Message.js");
const cloudinary = require("../lib/cloudinary.js");

const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (err) {
    console.log("Error in getAllContacts", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessagesByUserId", err);
    return res.status({ message: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imgUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imgUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imgUrl,
    });

    await newMessage.save();

    // sending messages in real time if user is online will be implemented using socket.io

    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (err) {
    console.log("Error in sendMessage controller", err.message);
    return res.status(500).json({ message: "Internal server error " });
  }
};

const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    //  Find all the messages where the loggedIn user is either sender or receiver.
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((message) =>
          message.senderId.toString() === loggedInUserId.toString()
            ? message.receiverId.toString()
            : message.senderId.toString()
        )
      ),
    ];
    const chatPartners = await User.find({_id: { $in: chatPartnerIds }}).select("-password");
    res.status(200).json({ message: "All chats fetched successfully", chatPartners });
  } catch (err) {
    console.log("Error in getChatPartners controller", err.message);
    return res.status(500).json({ message: "Internal server error " });
  }
};

module.exports = {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartners,
};

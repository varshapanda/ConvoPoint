import { Server } from "socket.io"; //Socket server
import http from "http";
import express from "express";
import { ENV } from "../lib/env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";


// server created that includes rest api and socket server
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ENV.CLIENT_URL,
    credentials: true, // From client cookies will be sent
  },
});

// Apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// Function to check if user is online or not
export const getReceiverSocketId = (userId)=>{
  return userSocketMapForOnlineUsers[userId]
}

// To store online users
const userSocketMapForOnlineUsers = {}; //{userId: socketId}

// listen to connection using io.on()
io.on("connection", (socket) => {
  console.log("A user connected ", socket.user.fullName);

  const userId = socket.userId;
  userSocketMapForOnlineUsers[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMapForOnlineUsers)); // this will take all te keys and send it back to the client

  // with socket.on() we listen to events
  // listen to disconnections
  socket.on("disconnect", () => {
    console.log("A user connected disconnected", socket.user.fullName);
    delete userSocketMapForOnlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMapForOnlineUsers));
  });
});

export { io, app, server };

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const connectDB = require('./lib/db.js');

const app = express();

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/dist/index.html"));
  });
} else {
  app.get("/", (_, res) => {
    res.status(200).json("Welcome to ConvoPoint Backend");
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
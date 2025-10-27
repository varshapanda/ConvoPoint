const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./lib/db.js");
const authRoutes = require("./routes/auth.route.js");
const messageRoutes = require("./routes/message.route.js");
const ENV = require("./lib/env.js");

connectDB();
const app = express();

const PORT = process.env.PORT || ENV.PORT || 8080;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

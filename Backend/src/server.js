const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require('./lib/db.js');
const authRoutes = require("./routes/auth.route.js");
const ENV = require("./lib/env.js");

connectDB();
const app = express();

const PORT = ENV.PORT || 8080;
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

if (ENV.NODE_ENV === "production") {
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
});
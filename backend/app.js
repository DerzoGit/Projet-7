const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");

app.use(cors());
app.use(express.json());
app.use(helmet({crossOriginResourcePolicy: false}));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
const express = require("express");
const app = express();
const cors = require("cors");


const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post")

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
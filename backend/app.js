const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/error-handler");


const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post")

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

module.exports = app;
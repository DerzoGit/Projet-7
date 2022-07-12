// Import express, controle API node.js
const express = require("express");
// création d'un app express
const app = express();
// Import cors pour gérer les accès à l'API
const cors = require("cors");
// Import path, donne accès au chemin de système de fichier
const path = require("path");
// Import helmet, sécurisation express app
const helmet = require("helmet");

// Import des différentes routes utilisées
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
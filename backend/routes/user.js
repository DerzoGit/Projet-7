// Import d'express
const express = require("express");
// Création router avec express
const router = express.Router();
// Import controller des utilisateurs
const userCtrl = require("../controllers/user");
// Import middleware d'authentification
const auth = require("../middleware/auth");

// Route de suppression d'un utilisateur
router.delete("/:id", auth, userCtrl.deleteUser);
// Route de récupération d'un utilisateur
router.get("/:id", auth, userCtrl.getOneUser);
// Route de récupération de tous les utilisateurs
router.get("/", auth, userCtrl.getAllUsers);

module.exports = router;
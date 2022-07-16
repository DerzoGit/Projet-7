// Import express
const express = require("express");
// Création router avec express
const router = express.Router();
// Import controller d'authentification
const authCtrl = require("../controllers/auth");
// Import middleware de validation à l'authentification
const authValid = require("../middleware/auth-validator");

// Route d'inscription de l'utilisateur
router.post("/signup", authValid.checkName, authValid.checkValid, authCtrl.signup);
// Route de connexion de l'utilisateur
router.post("/login", authValid.checkValid, authCtrl.login);

module.exports = router;
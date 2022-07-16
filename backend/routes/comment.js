// Import express
const express = require("express");
// Création router avec express
const router = express.Router();
// Import controller des commentaires
const commentCtrl = require("../controllers/comment");
// Import middleware d'authentification
const auth = require("../middleware/auth");
// Importe middleware multer
const multer = require("../middleware/multer-config");

// Route de création de commentaire
router.post("/", auth, multer, commentCtrl.createComment);
// Route de mofication de commentaire
router.put("/:id", auth, multer, commentCtrl.updateComment);
// Route du supression de commentaire
router.delete("/:id", auth, commentCtrl.deleteComment);
// Route de récupération d'un commentaire
router.get("/:id", auth, commentCtrl.getOneComment);
// Route de récupération de tous les commentaires
router.get("/", auth, commentCtrl.getAllComments);

module.exports = router;
// Import express
const express = require("express");
// Création router avec express
const router = express.Router();
// Import controller des posts
const postCtrl = require("../controllers/post");
// Import middleware d'authentification
const auth = require("../middleware/auth");
// Import middleware multer
const multer = require("../middleware/multer-config");

// Route de création d'un post
router.post("/", auth, multer, postCtrl.createPost);
// Route de modification d'un post
router.put("/:id", auth, multer, postCtrl.updatePost);
// Route de suppression d'un post
router.delete("/:id", auth, postCtrl.deletePost);
// Route de récupération d'un post
router.get("/:id", auth, postCtrl.getOnePost);
// Route de récupération de tous les posts
router.get("/", auth, postCtrl.getAllPosts);

module.exports = router;
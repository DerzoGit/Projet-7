// Import des models
const db = require("../models/index");
// Import file system, modification système de fichier
const fs = require("fs");

// Création d'un post
exports.createPost = (req, res, next) => {
    const postObject = req.body;
    // Vérification si le titre et le contenu ne sont pas vide pour poster
    if (postObject.title.length >= 1 && postObject.content.length >= 1) {
        const post = new db.Post({
            ...postObject,
            media: (req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null)
        });
        post.save()
        .then(() => res.status(201).json({ message: "Le post a bien été créé" }))
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(400).json({ error: "Le titre et le message ne peuvent être vides" })
    }
}

// Modification d'un post
exports.updatePost = (req, res, next) => {
    const userId = req.auth.userId;

    db.Post.findOne({ where: {id: req.params.id }})
    .then(post => {
        // Véfication si l'utilisateur est l'auteur du post
        if (userId === post.userId) {
        
            const postObject = req.file ? { 
            ...req.body, media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
        } : { ...req.body };
            db.Post.update({ ...postObject, id: req.params.id}, { where: {id: req.params.id} })
            .then(() => res.status(200).json({ message: "Le post a bien été modifié" }))
            .catch(error => res.status(400).json({ error }))
        } else {
            res.status(400).json({ message: "Vous n'avez pas les autorisations nécessaires" })
        }
    }) 
    .catch(error => res.status(500).json({ error }))
}

// Suppression d'un post
exports.deletePost = (req, res, next) => {
    const userId = req.auth.userId;
    const role = req.auth.role;
    db.Post.findOne({ where: {id: req.params.id }})
    .then(post => {
                // Supression du post uniquement si auteur ou admin
        if (userId === post.userId || role === "Admin") { 
            if (post.media) {
                const filename = post.media.split("/images/")[1]
                fs.unlink(`images/${filename}`, () => {
                    db.Post.destroy({ where: {id: req.params.id} })
                    .then(() => res.status(200).json({ message: "Le post a bien été supprimé" }))
                    .catch(error => res.status(400).json({ error }))
            })
            } else {
                db.Post.destroy({ where: {id: req.params.id} })
                .then(() => res.status(200).json({ message: "Le post a bien été supprimé" }))
                .catch(error => res.status(400).json({ error }))
            }
        } else {
            res.status(400).json({ message: "Vous n'avez pas les autorisations nécessaires" })
        }
    })
    .catch(error => res.status(500).json({ error }))
}

// Récupération d'un post
exports.getOnePost = (req, res, next) => {
    db.Post.findOne({ where: {id: req.params.id} })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }))
}

// Récupération de tous les posts, du plus récent au moins récent. Liaison DB model User pour récupération identité de l'utilisateur
exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({ order: [["createdAt", "DESC"]], include: [{ model: db.User, attributes: ["firstName", "lastName"] }] })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
}
const db = require("../models/index")
const fs = require("fs");

exports.createPost = (req, res, next) => {
    const postObject = req.body;
    if(postObject.title.length >= 1 && postObject.content.length >= 1) {
        const post = new db.Post({
            ...postObject,
            media: (req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null)
        });
        post.save()
        .then(() => res.status(201).json({ message: "Le post a bien été créé" }))
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(400).json({ error: "Le titre et le message ne peuvent être vides." })
    }
}


exports.updatePost = (req, res, next) => {
    const userId = req.auth.userId;

    db.Post.findOne({ where: {id: req.params.id }})
    .then(post => {
        if (userId === post.userId) {
        
            const postObject = req.file ? { 
            ...req.body, media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
        } : { ...req.body };
            db.Post.update({ ...postObject, id: req.params.id}, { where: {id: req.params.id} })
            .then(() => res.status(200).json({ message: "Le post a bien été modifié" }))
            .catch(error => res.status(400).json({ error }))
        } else {
            res.status(400).json({ message: "Vous n'avez pas les autorisations nécessaires." })
        }
    }) 
    .catch(error => res.status(500).json({ error }))
    
}


exports.deletePost = (req, res, next) => {
    const userId = req.auth.userId;
    const role = req.auth.role;
    db.Post.findOne({ where: {id: req.params.id }})
    .then(post => {
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
            res.status(400).json({ message: "Vous n'avez pas les autorisations nécessaires." })
        }
    })
    .catch(error => res.status(500).json({ error }))
}


exports.getOnePost = (req, res, next) => {
    db.Post.findOne({ where: {id: req.params.id} })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }))
}


exports.getAllPosts = (req, res, next) => {
    db.Post.findAll({ order: [["createdAt", "DESC"]], include: [{ model: db.User, attributes: ["firstName", "lastName"] }] })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
}
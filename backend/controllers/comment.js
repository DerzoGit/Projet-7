const db = require("../models/index");
const fs = require("fs");

exports.createComment = (req, res, next) => {
    const commentObject = req.body;
    const comment = new db.Comment({
        ...commentObject,
        media: (req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null)
    });
    comment.save()
    .then(() => res.status(201).json({ message: "Le commentaire a bien été posté" }))
    .catch(error => res.status(400).json({ error }))
}


exports.updateComment = (req, res, next) => {
    const userId = req.auth.userId;

    db.Comment.findOne({ where: {id: req.params.id }})
    .then(comment => {

        if (userId === comment.userId) {
            const commentObject = req.file ? { 
                ...req.body, media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
            } : { ...req.body };
            db.Comment.update({ ...commentObject, id: req.params.id}, { where: {id: req.params.id} })
            .then(() => res.status(200).json({ message: "Le commentaire a bien été modifié" }))
            .catch(error => res.status(400).json({ error }))
        } else {
            res.status(400).json({ message: "Vous n'avez pas les autorisations nécessaires." })
        }
        
    })
    .catch(error => res.status(500).json({ error }))
}


exports.deleteComment = (req, res, next) => {
    const userId = req.auth.userId;
    const role = req.auth.role;
    db.Comment.findOne({ where: {id: req.params.id }})
    .then(comment => {
        if (userId === comment.userId || role === "Admin") {
            if (comment.media) {
                const filename = comment.media.split("/images/")[1]
                fs.unlink(`images/${filename}`, () => {
                    db.Comment.destroy({ where: {id: req.params.id} })
                    .then(() => res.status(200).json({ message: "Le commentaire a bien été supprimé" }))
                    .catch(error => res.status(400).json({ error }))
                })
            } else {
                db.Comment.destroy({ where: {id: req.params.id} })
                .then(() => res.status(200).json({ message: "Le commentaire a bien été supprimé" }))
                .catch(error => res.status(400).json({ error }))
            }
        } else {
            res.status(401).json({ message: "Vous n'avez pas les autorisations nécessaires." })
        }
    })
    .catch(error => res.status(500).json({ error }))
}


exports.getOneComment = (req, res, next) => {
    db.Comment.findOne({ where: {id: req.params.id} })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }))
}


exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({ order: [["createdAt", "DESC"]], include: [{ model: db.User, attributes: ["firstName", "lastName"] }] })
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }))
}
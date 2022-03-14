const Comment = require("../models/comment");

exports.createComment = (req, res, next) => {
    const commentObject = req.body;
    const comment = new Comment({
        ...commentObject
    });
    comment.save()
    .then(() => res.status(201).json({ message: "Le commentaire a bien été posté" }))
    .catch(error => res.status(400).json({ error }))
}


exports.updateComment = (req, res, next) => {
    const commentObject = req.body;

    Comment.update({ ...commentObject, id: req.params.id}, { where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: "Le commentaire a bien été modifié" }))
    .catch(error => res.status(400).json({ error }))
}


exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: "Le commentaire a bien été supprimé" }))
    .catch(error => res.status(400).json({ error }))
}


exports.getOneComment = (req, res, next) => {
    Comment.findOne({ where: {id: req.params.id} })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(404).json({ error }))
}


exports.getAllComments = (req, res, next) => {
    Comment.findAll()
    .then(comments => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }))
}
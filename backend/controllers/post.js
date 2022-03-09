// const db = require("../config/db");
const Post = require("../models/post");
// const User = require("../models/user");

exports.createPost = (req, res, next) => {
    const postObject = req.body;
    const post = new Post({
        ...postObject
    });
    post.save()
    .then(() => res.status(201).json({ message: "Le post a bien été créé" }))
    .catch(error => res.status(400).json({ error }))
}


exports.updatePost = (req, res, next) => {
    const postObject = req.body;

    Post.update({ ...postObject, id: req.params.id}, { where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: "Le post a bien été modifié" }))
    .catch(error => res.status(400).json({ error }))
}


exports.deletePost = (req, res, next) => {
    Post.destroy({ where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: "Le post a bien été supprimé" }))
    .catch(error => res.status(400).json({ error }))
}


exports.getOnePost = (req, res, next) => {
    Post.findOne({ where: {id: req.params.id} })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }))
}


exports.getAllPosts = (req, res, next) => {
    Post.findAll()
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json({ error }))
}
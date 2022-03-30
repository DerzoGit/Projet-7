const Post = require("../models/post");
const fs = require("fs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.createPost = (req, res, next) => {
    const postObject = req.body;
    const post = new Post({
        ...postObject,
        media: (req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : null)
    });
    post.save()
    .then(() => res.status(201).json({ message: "Le post a bien été créé" }))
    .catch(error => res.status(400).json({ error }))
}


exports.updatePost = (req, res, next) => {
    const postObject = req.file ? { 
        ...req.body, media: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
    } : { ...req.body };

    Post.update({ ...postObject, id: req.params.id}, { where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: "Le post a bien été modifié" }))
    .catch(error => res.status(400).json({ error }))
}


exports.deletePost = (req, res, next) => {
    const userId = 6;
    const user = User.findOne({ where: { id: userId }, raw:true, nest:true });
    const role = req.auth.role;
    console.log(role)
    Post.findOne({ where: {id: req.params.id }})
    .then(post => {
        
        console.log();
        if (user) { 
            
            // if (post.media) {
            //     const filename = post.media.split("/images/")[1]
            //     fs.unlink(`images/${filename}`, () => {
            //         Post.destroy({ where: {id: req.params.id} })
            //         .then(() => res.status(200).json({ message: "Le post a bien été supprimé" }))
            //         .catch(error => res.status(400).json({ error }))
            // })
            // } else {
            //     Post.destroy({ where: {id: req.params.id} })
            //     .then(() => res.status(200).json({ message: "Le post a bien été supprimé" }))
            //     .catch(error => res.status(400).json({ error }))
            // }
        } else {
            res.status(400).json({ message: "Vous n'avez pas les autorisations nécessaires." })
        }
    })
    .catch(error => res.status(500).json({ error }))
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
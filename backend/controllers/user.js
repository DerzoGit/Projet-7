// Import models
const db = require("../models/index");

// Supression d'un utilisateur
exports.deleteUser = (req, res, next) => {
    db.User.destroy({ where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: "L'utilisateur a bien été supprimé" }))
    .catch(error => res.status(400).json({ error }))
}

// Récupération d'un utilisateur
exports.getOneUser = (req, res, next) => {
    db.User.findOne({ where: {id: req.params.id} })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }))
}

// Récupération de tous les utilisateurs
exports.getAllUsers = (req, res, next) => {
    db.User.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }))
}
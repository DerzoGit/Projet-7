const User = require("../models/user");


exports.deleteUser = (req, res, next) => {
    User.destroy({ where: {id: req.params.id} })
    .then(() => res.status(200).json({ message: "L'utilisateur a bien été supprimé" }))
    .catch(error => res.status(400).json({ error }))
}


exports.getOneUser = (req, res, next) => {
    User.findOne({ where: {id: req.params.id} })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }))
}


exports.getAllUsers = (req, res, next) => {
    User.findAll()
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json({ error }))
}
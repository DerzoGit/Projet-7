// Import mysql et sequelize pour utilisation de la DB
const mysql = require("mysql2");
const Sequelize = require("sequelize");

// Connexion à la DB
const db = new Sequelize('groupomania', 'root', 'RtPassword', {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
});

module.exports = db;
// Import mysql et sequelize pour utilisation de la DB
const mysql = require("mysql2");
const Sequelize = require("sequelize");

// Connexion à la DB
const db = new Sequelize(process.env.DB, process.env.user_DB, process.env.password_DB, {
    host: process.env.host_DB,
    port: process.env.port_DB,
    dialect: "mysql"
});

module.exports = db;
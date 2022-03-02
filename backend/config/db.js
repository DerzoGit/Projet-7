// const config = require("./db.config.json");
// const mysql = require("mysql2");
// const { Sequelize } = require("sequelize");

// module.exports = db = {};

// initialize();


// function initialize() {
//     const { host, port, user, password, database } = config.database;
//     const connection = mysql.createConnection({ host, port, user, password });
//     connection.query(`Create database if not exists \`${database}\`;`);

//     const sequelize = new Sequelize(database, user, password, { dialect: "mysql" });

//     db.User = require("../models/user")(sequelize);
//     db.Post = require("../models/post")(sequelize);
//     // db.Comment = require()(sequelize);

//     sequelize.sync({ alter: true });
// }


const mysql = require("mysql2");
const Sequelize = require("sequelize");

const db = new Sequelize('groupomania', 'root', 'RtPassword', {
    host: "localhost",
    port: 3306,
    pool: {
        max:5,
        min:0,
        idle: 10000
    },
    dialect: "mysql"
});

module.exports = db;
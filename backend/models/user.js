// Import sequelize
const { Model, DataTypes } = require("sequelize");
// Import connexion DB
const sequelize = require("../config/db");

// Initialisation du model d'utilisateur
class User extends Model {
}

User.init({
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false }, 
    email: { type: DataTypes.STRING, allowNull: false },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "User" }
}, {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true
});

module.exports = User;
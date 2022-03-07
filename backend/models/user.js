const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class User extends Model {
    associate(models) {
        User.hasMany(models.Post);
    }
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
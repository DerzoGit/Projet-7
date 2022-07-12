// Import sequelize
const { Model, DataTypes } = require("sequelize");
// Import connexion DB
const sequelize = require("../config/db");

// Initialisation du model de post
class Post extends Model {
};

Post.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
    content: { type: DataTypes.TEXT, allowNull: false }, 
    media: { type: DataTypes.STRING, allowNull: true, defaultValue: null }
}, {
    sequelize,
    modelName: "Post",
    tableName: "posts",
    timestamps: true
});

module.exports = Post;
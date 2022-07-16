// Import sequelize
const { Model, DataTypes } = require("sequelize");
// Import connexion DB
const sequelize = require("../config/db");

// Initialisation du model de commentaire
class Comment extends Model {
};

Comment.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false }, 
    media: { type: DataTypes.STRING, allowNull: true, defaultValue: null }
}, {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: true
});

module.exports = Comment;
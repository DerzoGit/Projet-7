const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Comment extends Model {
    // static associate(models) {
    //     Comment.belongsTo(models.User, { foreignKey: "userId" }, { onDelete: "cascade" });
    //     Comment.belongsTo(models.Post, { foreignKey: "postId" }, { onDelete: "cascade" });
    // }
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
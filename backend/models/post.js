const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

class Post extends Model {
    static associate(models) {
        Post.belongsTo(models.User, { foreignKey: "userId" });
    }
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
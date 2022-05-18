const User = require("./user")
const Post = require("./post")
const Comment = require("./comment")

User.hasMany(Post, { onDelete: "cascade" });
User.hasMany(Comment, { onDelete: "cascade" });
Post.belongsTo(User, { foreignKey: "userId" }, { onDelete: "cascade" });
Post.hasMany(Comment, { onDelete: "cascade" });
Comment.belongsTo(User, { foreignKey: "userId" }, { onDelete: "cascade" });
Comment.belongsTo(Post, { foreignKey: "postId" }, { onDelete: "cascade" });

module.exports = {
    User, Post, Comment
}
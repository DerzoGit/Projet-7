const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class Post extends Model {
    static associate (models){
    models.Post.belongsTo(models.User, { foreignKey: "userId" })
    }
}

Post.init({
    userId: { type: Sequelize.DataTypes.INTEGER, allowNull: true },
    title: { type: Sequelize.DataTypes.STRING, allowNull: true, defaultValue: null },
    content: { type: Sequelize.DataTypes.TEXT, allowNull: false }, 
    media: { type: Sequelize.DataTypes.STRING, allowNull: true, defaultValue: null }
}, {
    sequelize,
    modelName:"posts"
})

return Post;
}
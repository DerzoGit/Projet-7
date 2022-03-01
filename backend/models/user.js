const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class User extends Model {
    static associate (models){
    models.User.hasMany(models.Post)
    }
}

User.init({
    firstName: { type: Sequelize.DataTypes.STRING, allowNull: false },
    lastName: { type: Sequelize.DataTypes.STRING, allowNull: false }, 
    email: { type: Sequelize.DataTypes.STRING, allowNull: false },
    passwordHash: { type: Sequelize.DataTypes.STRING, allowNull: false },
    role: { type: Sequelize.DataTypes.STRING, allowNull: false, defaultValue: "User" }
}, {
    sequelize,
    modelName:"users"
})

return User;
}
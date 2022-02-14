const { DataTypes } = require("sequelize");

function model(sequelize) {
    const attributes = {
        title: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
        content: { type: DataTypes.TEXT, allowNull: false }, 
        media: { type: DataTypes.STRING, allowNull: true, defaultValue: null }
    };

    return sequelize.define("Post", attributes);
}

module.exports = model;
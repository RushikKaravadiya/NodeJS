const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/studentdb");

const Images = sequelize.define('images', {
    path: {
        type: DataTypes.STRING,
        allowNull: false
        
    }
});

module.exports = Images;

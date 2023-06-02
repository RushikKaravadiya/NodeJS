const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/studentdb");

const Images = sequelize.define('images', {
    path: {
        type: DataTypes.STRING,
        allowNull: false
        
    }
});


const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


User.hasMany(Images, { as: 'images' });


module.exports = {
    Images,
    User,
};

const Sequelize = require('sequelize');

const sequelize = require("../database/studentdb");

const Students = sequelize.define('students',{
    id :{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    first_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    last_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email_address:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = Students;
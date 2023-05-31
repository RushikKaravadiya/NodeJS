const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = require("../database/studentdb");

const Students = sequelize.define('students', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// class DemoTable extends Model { }

// DemoTable.init({
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// },
//     {
//         sequelize,
//         modelName: "Demo",
//         freezeTableName: true, // as name in modelname (remove extra s)
//         timestamps:false  // remove createdAt and deletedAt 
//     });
module.exports = Students;
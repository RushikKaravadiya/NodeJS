const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodelogin','postgres','1991',{
  dialect:'postgres',
  host:'localhost'
});

module.exports = sequelize;
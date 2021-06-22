//imports Sequelize package and creates instance of it as object 
const { Sequelize } = require('sequelize');

//now we create db as an instance of sequelize 
const db = new Sequelize("postgres://postgre:postgre@localhost:5432/workout-log-server");

module.exports = db;
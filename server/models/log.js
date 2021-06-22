//import sqlize lib of datatypes
const { DataTypes } = require('sequelize');
//import connection to our db from the db.js file 
const db = require('../db');


// create and define model using .define method
//this will become a table called users in postgres db eleven-journal
const Log = db.define('log', {
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner_id: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Log;
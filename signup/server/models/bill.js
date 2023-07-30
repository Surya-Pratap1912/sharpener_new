const Sequelize = require('sequelize');

const sequelize = require('../database');

const Data = sequelize.define("data",{
    id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },

    price : {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    dish : 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    tab: {
        type : Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Data;
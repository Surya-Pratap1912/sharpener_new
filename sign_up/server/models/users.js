const Sequelize = require('sequelize');
const sequelize = require('../database');

const Users = sequelize.define('users', {
    id: {
        type : Sequelize.STRING,
        primaryKey : true,
        allowNull : false
    },

    userName:{
        type : Sequelize.STRING,
        allowNull : false
    },

    password : {
        type : Sequelize.STRING,
        allowNull: false
    }


});

module.exports = Users ; 
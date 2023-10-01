const Sequelize = require('sequelize');

const sequelize = require('../database');

const Expanse = sequelize.define("expanses",{
    id: {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },

    amt : {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    des : 
    {
        type: Sequelize.STRING,
        allowNull: false
    },
    cat: {
        type : Sequelize.STRING,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
        defaultValue : new Date()
    }
});

module.exports = Expanse;
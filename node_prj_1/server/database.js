const Sequelize = require('sequelize');

const sequelize =  new Sequelize('node_test_1', 'root', 'root', {
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;
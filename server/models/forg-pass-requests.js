const Sequelize = require("sequelize");
const sequelize = require("../database");

const Fpr = sequelize.define("forgpassreq", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },

  isactive : {
    type: Sequelize.BOOLEAN,
      },
});

module.exports = Fpr;

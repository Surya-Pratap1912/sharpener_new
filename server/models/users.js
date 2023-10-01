const Sequelize = require("sequelize");
const sequelize = require("../database");

const Users = sequelize.define("users", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },

  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  totalExpanse : {
    type : Sequelize.INTEGER,
    defaultValue : 0

  },
  ispremiumuser: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Users;

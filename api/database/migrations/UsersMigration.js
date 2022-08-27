const Sequelize = require('sequelize');
const connection = require('../index');

const User = connection.define(
  'users',
  {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(11),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = User;

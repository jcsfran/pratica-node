const Sequelize = require('sequelize');
const connection = require('../index');

const Service = connection.define('services', {
  id: {
    type: Sequelize.BIGINT.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(64),
    allowNull: false,
  },
  price: {
    type: Sequelize.DOUBLE(6, 2),
    allowNull: false,
  },
});

module.exports = Service;

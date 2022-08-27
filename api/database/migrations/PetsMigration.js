const Sequelize = require('sequelize');
const connection = require('../index');
const User = require('../../database/migrations/UsersMigration');

const Pet = connection.define(
  'pets',
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
    spitz: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Pet.belongsTo(User, {
  constraint: true,
  foreignKey: 'userId',
});

User.hasMany(Pet, {
  constraint: true,
  foreignKey: 'userId',
});

module.exports = Pet;

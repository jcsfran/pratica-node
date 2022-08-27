const Sequelize = require('sequelize');
const connection = require('../index');
const Role = require('../../database/migrations/RolesMigration');

const Employee = connection.define(
  'employees',
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
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Employee.belongsTo(Role, {
  constraint: true,
  foreignKey: 'roleId',
});

Role.hasMany(Employee, { foreignKey: 'roleId' });

module.exports = Employee;

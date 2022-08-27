const Sequelize = require('sequelize');
const connection = require('../index');
const Permission = require('../../database/migrations/PermissionsMigration');
const Employee = require('../../database/migrations/EmployeesMigration');

const pivot = connection.define(
  'employee_permission',
  {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

pivot.belongsTo(Permission, {
  constraint: true,
  foreignKey: 'permissionId',
});

pivot.belongsTo(Employee, {
  constraint: true,
  foreignKey: 'employeeId',
});

Employee.hasMany(pivot, { foreignKey: 'employeeId' });
Permission.hasMany(pivot, { foreignKey: 'permissionId' });

module.exports = pivot;

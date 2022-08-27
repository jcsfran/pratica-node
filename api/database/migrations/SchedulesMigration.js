const Sequelize = require('sequelize');
const connection = require('../index');
const Service = require('../../database/migrations/ServicesMigration');
const Pet = require('../../database/migrations/PetsMigration');
const Employee = require('../../database/migrations/EmployeesMigration');

const Schedule = connection.define(
  'schedules',
  {
    id: {
      type: Sequelize.BIGINT.UNSIGNED,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    schedule: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('canceled', 'done', 'pending'),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

Schedule.belongsTo(Pet, {
  constraint: true,
  foreignKey: 'petId',
});

Schedule.belongsTo(Employee, {
  constraint: true,
  foreignKey: 'employeeId',
});

Schedule.belongsTo(Service, {
  constraint: true,
  foreignKey: 'serviceId',
});

Employee.hasMany(Schedule, { foreignKey: 'employeeId' });
Pet.hasMany(Schedule, { foreignKey: 'petId' });
Service.hasMany(Schedule, { foreignKey: 'serviceId' });

module.exports = Schedule;

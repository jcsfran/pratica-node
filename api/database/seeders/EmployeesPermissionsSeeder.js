const table = require('../../database/migrations/EmployeePermissionMigration');

const EmployeesPermissions = (async () => {
  try {
    await table.create({
      employeeId: 1,
      permissionId: 2,
    });

    console.log({ message: 'Permissions of users has been seeded', code: 201 });
  } catch (error) {
    console.log({ message: error, code: 422 });
  }
})();

module.exports = EmployeesPermissions;

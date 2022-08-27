const Seeders = (async () => {
  const Roles = await require('../../database/seeders/RolesSeeder');
  const Employees = await require('../../database/seeders/EmployeeSeeder');
  const Permissions = await require('../../database/seeders/PermissionsSeeder');
  const EmployeesPermissions =
    await require('../../database/seeders/EmployeesPermissionsSeeder');
})();

module.exports = Seeders;

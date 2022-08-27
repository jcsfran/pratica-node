(async () => {
  const connection = await require('../index');
  const Role = await require('./RolesMigration');
  const Permission = await require('./PermissionsMigration');
  const User = await require('./UsersMigration');
  const Pet = await require('./PetsMigration');
  const Employee = await require('./EmployeesMigration');
  const EmployeePermission = await require('./EmployeePermissionMigration');
  const Service = await require('./ServicesMigration');
  const Schedule = await require('./SchedulesMigration');

  await connection.sync({ force: true });

  const Seeders = await require('../seeders/index');
})();

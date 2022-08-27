const table = require('../../database/migrations/PermissionsMigration');

const Permissions = (async () => {
  try {
    await table.create({
      name: 'manage-employee',
    });

    await table.create({
      name: 'create-user',
    });

    await table.create({
      name: 'create-schedule',
    });
    console.log({ message: 'Permissions has been seeded', code: 201 });
  } catch (error) {
    console.log({ message: error, code: 422 });
  }
})();

module.exports = Permissions;

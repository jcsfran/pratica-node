const table = require('../../database/migrations/RolesMigration');

const Roles = (async () => {
  try {
    await table.create({
      name: 'admin',
    });

    await table.create({
      name: 'employee',
    });
    console.log({ message: 'Roles has been seeded', code: 201 });
  } catch (error) {
    console.log({ message: error, code: 422 });
  }
})();

module.exports = Roles;

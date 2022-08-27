const table = require('../../database/migrations/EmployeesMigration');

const Employees = (async () => {
  try {
    await table.create({
      name: 'Admin',
      email: 'teste.admin@gmail.com',
      phone: '38102983',
      password: '321391',
      roleId: '1',
    });
    console.log({ message: 'Employees has been seeded', code: 201 });
  } catch (error) {
    console.log({ message: error, code: 422 });
  }
})();

module.exports = Employees;

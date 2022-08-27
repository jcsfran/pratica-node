// const EmployeeMigration = require('../../database/migrations/EmployeesMigration');
// const RoleMigration = require('../../database/migrations/RolesMigration');

// class AuthorizationsController {
//   async verifyAuthorization(permission, id, res) {
//     try {
//       const employee = await EmployeeMigration.findByPk(id, {
//         include: [
//           {
//             model: RoleMigration,
//           },
//         ],
//         attributes: ['id'],
//       });
//       if (employee) {
//         return true;
//       }
//       res.status(422).json({ message: 'Not authorization' });
//     } catch (error) {
//       res.status(422).json({ message: error });
//     }
//   }
// }

// module.exports = AuthorizationsController;

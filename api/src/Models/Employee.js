const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('config');
const SECRET = config.get('auth.secret');
const table = require('../../database/migrations/EmployeesMigration');
const Schedule = require('../../database/migrations/SchedulesMigration');
const Role = require('../../database/migrations/RolesMigration');
const EmployeePermission = require('../../database/migrations/EmployeePermissionMigration');

class EmployeeModel {
  async list() {
    try {
      const employees = await table.findAll({
        include: [{ model: Role, attributes: ['name'] }],
        attributes: [
          'id',
          'name',
          'email',
          'phone',
          [
            sequelize.fn(
              'DATE_FORMAT',
              sequelize.col('employees.createdAt'),
              '%d-%m-%Y'
            ),
            'createdAt',
          ],
        ],
      });
      return { message: employees, code: 200 };
    } catch (error) {
      console.log(error);
      return { message: error, code: 422 };
    }
  }

  async create(params) {
    try {
      const user = await table.create(params);
      this.createPermissions(user.id, params.permissions);
      return { message: 'Successful create employee', code: 201 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async show(id) {
    try {
      const employee = await table.findByPk(id, {
        include: [
          {
            model: Schedule,
            attributes: [
              'id',
              [
                sequelize.fn(
                  'DATE_FORMAT',
                  sequelize.col('schedules.schedule'),
                  '%d-%m-%Y'
                ),
                'date',
              ],
              [
                sequelize.fn(
                  'DATE_FORMAT',
                  sequelize.col('schedules.schedule'),
                  '%H:%i:%s'
                ),
                'schedule',
              ],
              'status',
            ],
          },
          { model: Role, attributes: ['name'] },
        ],
        attributes: [
          'id',
          'name',
          'email',
          'phone',
          [
            sequelize.fn(
              'DATE_FORMAT',
              sequelize.col('employees.createdAt'),
              '%d-%m-%Y'
            ),
            'createdAt',
          ],
        ],
      });
      if (employee) {
        return { message: employee, code: 200 };
      }
      return { message: 'Employee not found', code: 404 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async update(params, id) {
    try {
      await table.update(params, {
        where: {
          id: id,
        },
      });

      return { message: 'Successful updated employee', code: 200 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async delete(id) {
    try {
      await table.destroy({
        where: {
          id: id,
        },
      });

      return { message: 'Successful deleted employee', code: 200 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async login(params) {
    try {
      const employee = await table.findOne({
        where: {
          email: params.email,
          password: params.password,
        },
      });

      if (employee) {
        const token = jwt.sign({ employeeId: employee.id }, SECRET, {
          expiresIn: '2h',
        });

        return {
          message: {
            message: 'Employee authenticate',
            auth: true,
            token: token,
          },
          code: 200,
        };
      }

      return {
        message: { message: 'Employee not authenticate', auth: false },
        code: 404,
      };
    } catch (error) {
      return { message: 'error', code: 401 };
    }
  }

  async createPermissions(id, permissions) {
    try {
      let refactorPermissions = [];
      permissions.map((permission) => {
        refactorPermissions.push({ employeeId: id, permissionId: permission });
      });
      await EmployeePermission.bulkCreate(refactorPermissions);
    } catch (error) {
      return { message: error, code: 422 };
    }
  }
}

module.exports = EmployeeModel;

const sequelize = require('sequelize');
const table = require('../../database/migrations/SchedulesMigration');
const Pet = require('../../database/migrations/PetsMigration');
const Service = require('../../database/migrations/ServicesMigration');
const Employee = require('../../database/migrations/EmployeesMigration');

class ScheduleModel {
  async list(params) {
    try {
      const schedules = await table.findAll({
        attributes: [
          'id',
          [
            sequelize.fn('DATE_FORMAT', sequelize.col('schedule'), '%d-%m-%Y'),
            'date',
          ],
          [
            sequelize.fn('DATE_FORMAT', sequelize.col('schedule'), '%H:%i:%s'),
            'schedule',
          ],
          'status',
        ],
        where: {
          status: params.status,
        },
      });
      return { message: schedules, code: 200 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async create(params) {
    try {
      await table.create(params);

      return { message: 'Successful create schedule', code: 201 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async show(id) {
    try {
      const schedule = await table.findByPk(id, {
        include: [
          { model: Pet, attributes: ['id', 'name', 'spitz'] },
          { model: Service, attributes: ['id', 'title', 'price'] },
          { model: Employee, attributes: ['id', 'name'] },
        ],
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
      });
      if (schedule) {
        return { message: schedule, code: 200 };
      }
      return { message: 'Schedule not found', code: 404 };
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

      return { message: 'Successful updated schedule', code: 200 };
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

      return { message: 'Successful deleted schedule', code: 200 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }
}

module.exports = ScheduleModel;

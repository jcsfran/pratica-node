const sequelize = require('sequelize');
const ServiceTable = require('../../database/migrations/ServicesMigration');
const Schedule = require('../../database/migrations/SchedulesMigration');

class ServiceModel {
  async list() {
    try {
      const services = await ServiceTable.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      return { message: services, code: 200 };
    } catch (error) {
      console.log(error);
      return { message: error, code: 422 };
    }
  }

  async create(params) {
    try {
      await ServiceTable.create(params);

      return { message: 'Successful create service', code: 201 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async show(id) {
    try {
      const service = await ServiceTable.findByPk(id, {
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
            where: { status: 'pending' },
          },
        ],
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      if (service) {
        return { message: service, code: 200 };
      }
      return { message: 'Service not found', code: 404 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async update(params, id) {
    try {
      await ServiceTable.update(params, {
        where: {
          id: id,
        },
      });

      return { message: 'Successful updated service', code: 200 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async delete(id) {
    try {
      await ServiceTable.destroy({
        where: {
          id: id,
        },
      });

      return { message: 'Successful deleted service', code: 200 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }
}

module.exports = ServiceModel;

const sequelize = require('sequelize');
const table = require('../../database/migrations/PetsMigration');
const User = require('../../database/migrations/UsersMigration');
const Schedule = require('../../database/migrations/SchedulesMigration');

class PetModel {
  async list() {
    try {
      const pets = await table.findAll({
        attributes: [
          'id',
          'name',
          'spitz',
          [
            sequelize.fn(
              'DATE_FORMAT',
              sequelize.col('pets.createdAt'),
              '%d-%m-%Y'
            ),
            'createdAt',
          ],
        ],
      });
      return { message: pets, code: 200 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async create(params) {
    try {
      await table.create(params);

      return { message: 'Successful create pet', code: 201 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async show(id) {
    try {
      const pet = await table.findByPk(id, {
        include: [
          { model: User, attributes: ['id', 'name'] },
          {
            model: Schedule,
            attributes: ['id', 'schedule', 'status'],
          },
        ],
        attributes: [
          'id',
          'name',
          'spitz',
          [
            sequelize.fn(
              'DATE_FORMAT',
              sequelize.col('pets.createdAt'),
              '%d-%m-%Y'
            ),
            'createdAt',
          ],
        ],
        order: [
          [
            {
              model: Schedule,
            },
            'status',
            'DESC',
          ],
        ],
      });
      if (pet) {
        return { message: pet, code: 200 };
      }
      return { message: 'Pet not found', code: 404 };
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

      return { message: 'Successful updated pet', code: 200 };
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

      return { message: 'Successful deleted pet', code: 200 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }
}

module.exports = PetModel;

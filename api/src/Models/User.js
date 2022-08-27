const sequelize = require('sequelize');
const table = require('../../database/migrations/UsersMigration');
const Pet = require('../../database/migrations/PetsMigration');

class UserModel {
  async list() {
    try {
      const users = await table.findAll({
        attributes: [
          'id',
          'name',
          'email',
          'phone',
          [
            sequelize.fn('DATE_FORMAT', sequelize.col('createdAt'), '%d-%m-%Y'),
            'createdAt',
          ],
        ],
      });
      return { message: users, code: 200 };
    } catch (error) {
      console.log(error);
      return { message: error, code: 422 };
    }
  }

  async create(params) {
    try {
      await table.create(params);

      return { message: 'Successful create user', code: 201 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }

  async show(id) {
    try {
      const user = await table.findByPk(id, {
        include: {
          model: Pet,
          attributes: ['id', 'name', 'spitz'],
        },
        attributes: [
          'id',
          'name',
          'email',
          'phone',
          [
            sequelize.fn(
              'DATE_FORMAT',
              sequelize.col('users.createdAt'),
              '%d-%m-%Y'
            ),
            'createdAt',
          ],
        ],
      });
      if (user) {
        return { message: user, code: 200 };
      }
      return { message: 'User not found', code: 404 };
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

      return { message: 'Successful updated user', code: 200 };
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

      return { message: 'Successful deleted user', code: 200 };
    } catch (error) {
      return { message: error, code: 422 };
    }
  }
}

module.exports = UserModel;

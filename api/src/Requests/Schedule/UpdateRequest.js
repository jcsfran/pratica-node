const validate = require('validator');

module.exports = {
  async validate(params, res) {
    let error = { message: [] };

    if (!validate.isISO8601(params.schedule)) {
      error.message.push('Is not schedule');
    }

    if (!validate.isIn(params.status, ['canceled', 'done', 'pending'])) {
      error.message.push('Empty status');
    }

    if (error.message.length !== 0) {
      res.status(403).json(error);
    }

    return {
      status: params.status,
      schedule: params.schedule,
    };
  },
};

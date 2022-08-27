const validate = require('validator');

module.exports = {
  async validate(params, res) {
    let error = { message: [] };

    if (!validate.isEmail(params.email)) {
      error.message.push('Email incorrect');
    }

    if (validate.isEmpty(params.name)) {
      error.message.push('Empty name');
    }

    if (!validate.isInt(params.phone)) {
      error.message.push('Incorrect phone');
    }

    if (error.message.length !== 0) {
      res.status(403).json(error);
    }

    return {
      email: params.email,
      name: params.name,
      phone: params.phone,
    };
  },
};

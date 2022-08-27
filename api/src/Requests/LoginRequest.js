const validate = require('validator');
const sha1 = require('sha1');

module.exports = {
  async validate(params, res) {
    let error = { message: [] };

    if (!validate.isEmail(params.email)) {
      error.message.push('Email incorrect');
    }

    if (validate.isEmpty(params.password)) {
      error.message.push('Empty password');
    }

    if (error.message.length !== 0) {
      res.status(403).json(error);
    }

    return {
      email: params.email,
      password: sha1(params.password),
    };
  },
};

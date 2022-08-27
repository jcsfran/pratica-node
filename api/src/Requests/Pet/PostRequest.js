const validate = require('validator');

module.exports = {
  async validate(params, res) {
    let error = { message: [] };

    if (validate.isEmpty(params.name)) {
      error.message.push('Empty name');
    }

    if (validate.isEmpty(params.spitz)) {
      error.message.push('Empty spitz');
    }

    if (!validate.isInt(params.user_id)) {
      error.message.push('UserId is int');
    }

    if (error.message.length !== 0) {
      res.status(403).json(error);
    }

    return {
      name: params.name,
      spitz: params.spitz,
      userId: params.user_id,
    };
  },
};

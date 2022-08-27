const validate = require('validator');

module.exports = {
  async validate(params, res) {
    let error = { message: [] };

    if (validate.isEmpty(params.title)) {
      error.message.push('Empty title');
    }

    if (!validate.isCurrency(params.price)) {
      error.message.push('Incorrect price');
    }

    if (error.message.length !== 0) {
      res.status(403).json(error);
    }

    return {
      title: params.title,
      price: params.price,
    };
  },
};

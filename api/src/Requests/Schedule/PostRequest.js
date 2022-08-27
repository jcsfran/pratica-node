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

    if (!validate.isInt(params.pet_id)) {
      error.message.push('PetId is int');
    }

    if (!validate.isInt(params.employee_id)) {
      error.message.push('EmployeeId is int');
    }

    if (!validate.isInt(params.service_id)) {
      error.message.push('ServiceId is int');
    }

    if (error.message.length !== 0) {
      res.status(403).json(error);
    }

    return {
      schedule: params.schedule,
      status: params.status,
      petId: params.pet_id,
      employeeId: params.employee_id,
      serviceId: params.service_id,
    };
  },
};

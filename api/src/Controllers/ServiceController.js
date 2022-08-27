const ServiceModel = require('../Models/Service');
const ServiceRequest = require('../Requests/Service/PostRequest');

class ServiceController {
  async get(req, res) {
    const Service = new ServiceModel();
    const result = await Service.list();

    res.status(result.code).json(result.message);
  }

  async post(req, res) {
    const params = await req.body;
    const validate = await ServiceRequest.validate(params, res);
    const Service = new ServiceModel();
    const result = await Service.create(validate);

    res.status(result.code).json(result.message);
  }

  async put(req, res) {
    const id = req.params.id;
    const params = await req.body;
    const validate = await ServiceRequest.validate(params, res);
    const Service = new ServiceModel();
    const result = await Service.update(validate, id);

    res.status(result.code).json(result.message);
  }

  async delete(req, res) {
    const id = req.params.id;
    const Service = new ServiceModel();
    const result = await Service.delete(id);

    res.status(result.code).json(result.message);
  }

  async getById(req, res) {
    const id = req.params.id;
    const Service = new ServiceModel();
    const result = await Service.show(id);

    res.status(result.code).json(result.message);
  }
}

module.exports = ServiceController;

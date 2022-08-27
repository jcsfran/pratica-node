const PetModel = require('../Models/Pet');
const PetRequest = require('../Requests/Pet/PostRequest');

class PetController {
  async get(req, res) {
    const Pet = new PetModel();
    const result = await Pet.list();

    res.status(result.code).json(result.message);
  }

  async post(req, res) {
    const params = await req.body;
    const validate = await PetRequest.validate(params, res);
    const Pet = new PetModel();
    const result = await Pet.create(validate);

    res.status(result.code).json(result.message);
  }

  async put(req, res) {
    const id = req.params.id;
    const params = await req.body;
    const validate = await PetRequest.validate(params, res);
    const Pet = new PetModel();
    const result = await Pet.update(validate, id);

    res.status(result.code).json(result.message);
  }

  async delete(req, res) {
    const id = req.params.id;
    const Pet = new PetModel();
    const result = await Pet.delete(id);

    res.status(result.code).json(result.message);
  }

  async getById(req, res) {
    const id = req.params.id;
    const Pet = new PetModel();
    const result = await Pet.show(id);

    res.status(result.code).json(result.message);
  }
}

module.exports = PetController;

const UserModel = require('../Models/User');
const UserRequest = require('../Requests/User/PostRequest');

class UserController {
  async get(req, res) {
    const User = new UserModel();
    const result = await User.list();

    res.status(result.code).json(result.message);
  }

  async post(req, res) {
    const params = await req.body;
    const validate = await UserRequest.validate(params, res);
    const User = new UserModel();
    const result = await User.create(validate);

    res.status(result.code).json(result.message);
  }

  async put(req, res) {
    const id = req.params.id;
    const params = await req.body;
    const validate = await UserRequest.validate(params, res);
    const User = new UserModel();
    const result = await User.update(validate, id);

    res.status(result.code).json(result.message);
  }

  async delete(req, res) {
    const id = req.params.id;
    const User = new UserModel();
    const result = await User.delete(id);

    res.status(result.code).json(result.message);
  }

  async getById(req, res) {
    const id = req.params.id;
    const User = new UserModel();
    const result = await User.show(id);

    res.status(result.code).json(result.message);
  }
}

module.exports = UserController;

const EmployeeModel = require('../Models/Employee');
const PostEmployeeRequest = require('../Requests/Employee/PostRequest');
const UpdateEmployeeRequest = require('../Requests/Employee/UpdateRequest');
const LoginRequest = require('../Requests/LoginRequest');

class EmployeeController {
  async get(req, res) {
    const Employee = new EmployeeModel();
    const result = await Employee.list();

    res.status(result.code).json(result.message);
  }

  async post(req, res) {
    const params = await req.body;
    const validate = await PostEmployeeRequest.validate(params, res);
    const Employee = new EmployeeModel();
    const result = await Employee.create(validate);

    res.status(result.code).json(result.message);
  }

  async put(req, res) {
    const id = req.params.id;
    const params = await req.body;
    const validate = await UpdateEmployeeRequest.validate(params, res);
    const Employee = new EmployeeModel();
    const result = await Employee.update(validate, id);

    res.status(result.code).json(result.message);
  }

  async delete(req, res) {
    const id = req.params.id;
    const Employee = new EmployeeModel();
    const result = await Employee.delete(id);

    res.status(result.code).json(result.message);
  }

  async getById(req, res) {
    const id = req.params.id;
    const Employee = new EmployeeModel();
    const result = await Employee.show(id);

    res.status(result.code).json(result.message);
  }

  async login(req, res) {
    const params = await req.body;
    const validate = await LoginRequest.validate(params, res);
    const Employee = new EmployeeModel();
    const result = await Employee.login(validate);

    res.status(result.code).json(result.message);
  }

  async logout(req, res) {
    req.employeeId = null;
    req.headers['authorization'] = null;

    res.status(200).json({ message: 'Logout' });
  }
}

module.exports = EmployeeController;

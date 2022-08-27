const jwt = require('jsonwebtoken');
const config = require('config');
const SECRET = config.get('auth.secret');
const EmployeeModel = require('../Models/Employee');
const LoginRequest = require('../Requests/LoginRequest');

class AuthController {
  async verifyJWT(req, res, next) {
    const bearer = await req.headers['authorization'];
    const token = bearer.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET);
      req.employeeId = await decoded.employeeId;

      next();
    } catch (error) {
      return res.status(401).json(error);
    }
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

module.exports = AuthController;

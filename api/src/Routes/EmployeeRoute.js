const express = require('express');
const Controller = require('../Controllers/EmployeeController');
const Auth = require('../Controllers/AuthController');

const router = express.Router();
const employeeController = new Controller();
const auth = new Auth();

router.post('/login', employeeController.login);
router.post('/logout', employeeController.logout);
router.post('/', employeeController.post);
router.get('/:id', auth.verifyJWT, employeeController.getById);
router.put('/:id', auth.verifyJWT, employeeController.put);
router.delete('/:id', auth.verifyJWT, employeeController.delete);
router.get('', auth.verifyJWT, employeeController.get);
router.get('/:id', auth.verifyJWT, employeeController.getById);

module.exports = router;

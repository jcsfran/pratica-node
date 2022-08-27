const express = require('express');
const Controller = require('../Controllers/UserController');
const Auth = require('../Controllers/AuthController');

const router = express.Router();
const userController = new Controller();
const auth = new Auth();

router.post('/', auth.verifyJWT, userController.post);
router.put('/:id', auth.verifyJWT, userController.put);
router.delete('/:id', auth.verifyJWT, userController.delete);
router.get('', auth.verifyJWT, userController.get);
router.get('/:id', auth.verifyJWT, userController.getById);

module.exports = router;

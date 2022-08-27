const express = require('express');
const Controller = require('../Controllers/ServiceController');
const Auth = require('../Controllers/AuthController');

const router = express.Router();
const serviceController = new Controller();
const auth = new Auth();

router.post('/', auth.verifyJWT, serviceController.post);
router.put('/:id', auth.verifyJWT, serviceController.put);
router.delete('/:id', auth.verifyJWT, serviceController.delete);
router.get('/', auth.verifyJWT, serviceController.get);
router.get('/:id', auth.verifyJWT, serviceController.getById);

module.exports = router;

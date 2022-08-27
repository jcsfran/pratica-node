const express = require('express');
const Controller = require('../Controllers/PetController');
const Auth = require('../Controllers/AuthController');

const router = express.Router();
const petController = new Controller();
const auth = new Auth();

router.post('/', auth.verifyJWT, petController.post);
router.put('/:id', auth.verifyJWT, petController.put);
router.delete('/:id', auth.verifyJWT, petController.delete);
router.get('', auth.verifyJWT, petController.get);
router.get('/:id', auth.verifyJWT, petController.getById);

module.exports = router;

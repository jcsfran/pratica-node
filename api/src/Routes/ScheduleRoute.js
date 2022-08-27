const express = require('express');
const Controller = require('../Controllers/ScheduleController');
const Auth = require('../Controllers/AuthController');

const router = express.Router();
const scheduleController = new Controller();
const auth = new Auth();

router.post('/', auth.verifyJWT, scheduleController.post);
router.put('/status/:id', auth.verifyJWT, scheduleController.putStatus);
router.put('/:id', auth.verifyJWT, scheduleController.put);
router.delete('/:id', auth.verifyJWT, scheduleController.delete);
router.get('', auth.verifyJWT, scheduleController.get);
router.get('/:id', auth.verifyJWT, scheduleController.getById);

module.exports = router;

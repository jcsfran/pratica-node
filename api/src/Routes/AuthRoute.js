const express = require('express');
const Controller = require('../Controllers/AuthController');

const router = express.Router();
const Auth = new Controller();

router.post('/login', Auth.login);
router.post('/logout', Auth.logout);

module.exports = router;

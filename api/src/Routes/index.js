const express = require('express');
const router = express.Router();

const AuthRoute = require('./AuthRoute');
const UserRoute = require('./UserRoute');
const PetRoute = require('./PetRoute');
const ServiceRoute = require('./ServiceRoute');
const EmployeeRoute = require('./EmployeeRoute');
const ScheduleRoute = require('./ScheduleRoute');

router.use('/auth', AuthRoute);
router.use('/users', UserRoute);
router.use('/pets', PetRoute);
router.use('/services', ServiceRoute);
router.use('/employees', EmployeeRoute);
router.use('/schedules', ScheduleRoute);

module.exports = router;

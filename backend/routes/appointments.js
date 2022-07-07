const express = require('express');
const AppointmentController = require('../controllers/appointments');

const router = express.Router();

router.get('/calendar', AppointmentController.GetAppointments);
router.post('/new', AppointmentController.CreateAppointment);

module.exports = router;

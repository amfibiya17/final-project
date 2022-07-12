const express = require('express');
const AppointmentController = require('../controllers/appointments');

const router = express.Router();

router.get('/calendar', AppointmentController.GetAppointments);
router.post('/new', AppointmentController.CreateAppointment);
router.delete('/delete', AppointmentController.DeleteAppointment);

module.exports = router;

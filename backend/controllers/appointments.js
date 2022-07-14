/* eslint-disable camelcase */
const Appointment = require('../models/appointment');

const AppointmentController = {

  GetAppointments: async (req, res) => {
    const { user_id } = req.query;
    try {
      const appointments = await Appointment
        .find({ user_id: { $in: user_id } })
        .populate({
          path: 'user_id',
          select: 'name',
        })
        .sort('date');
      res.status(200).json(appointments);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  CreateAppointment: async (req, res) => {
    const { date, name, user_id } = req.body;

    try {
      const appointment = await Appointment.create({ date, name, user_id });
      res.status(200).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  DeleteAppointment: async (req, res) => {
    const { eventId } = req.query;

    try {
      await Appointment.remove({ _id: eventId });
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  RemoveUser: async (req, res) => {
    const { eventId, userId } = req.body;
    const filter = { _id: eventId };
    const update = { $pullAll: { user_id: [{ _id: userId }] } };

    try {
      await Appointment.findOneAndUpdate(
        filter,
        update,
        { new: true, useFindAndModify: false },
      );
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  UpdateAppointment: async (req, res) => {
    const { eventId, date, name } = req.body;
    const filter = { _id: eventId };
    const update = { date, name } ;

    try {
      await Appointment.findOneAndUpdate(
        filter,
        update,
        { new: true, useFindAndModify: false },
      );
      res.status(200).json({ message: 'ok' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
};

module.exports = AppointmentController;

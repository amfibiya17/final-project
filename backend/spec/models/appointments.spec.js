/* eslint-disable array-callback-return */
const mongoose = require('mongoose');

require('../mongodb_helper');
const Appointment = require('../../models/appointment');

describe('Appointment model', () => {
  let mockUserId;
  let mockDate;
  let appointment;
  beforeEach((done) => {
    mongoose.connection.collections.appointments.drop(() => {
      done();
    });
    mockUserId = new mongoose.Types.ObjectId();
    mockDate = new Date();
    appointment = new Appointment({
      date: mockDate,
      name: 'Event',
      user_id: mockUserId,
    });
  });

  it('has a date', () => {
    expect(appointment.date).toBe(mockDate);
  });

  it('has a name', () => {
    expect(appointment.name).toBe('Event');
  });

  it('has a user_id', () => {
    expect(appointment.user_id).toBe(mockUserId);
  });

  it('can save an appointment', (done) => {
    appointment.save((err) => {
      expect(err).toBeNull();

      Appointment.find((error, appointments) => {
        expect(error).toBeNull();

        expect(appointments[0]).toMatchObject({
          date: mockDate,
          name: 'Event',
          user_id: mockUserId,
        });
        done();
      });
    });
  });
});
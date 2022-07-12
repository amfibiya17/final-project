/* eslint-disable array-callback-return */
const mongoose = require('mongoose');

require('../mongodb_helper');
const Appointment = require('../../models/appointment');

describe('Appointment model', () => {
  let mockUserId1;
  let mockUserId2;
  let mockDate;
  let appointment;
  beforeEach((done) => {
    mongoose.connection.collections.appointments.drop(() => {
      done();
    });
    mockUserId1 = new mongoose.Types.ObjectId();
    mockUserId2 = new mongoose.Types.ObjectId();
    mockDate = new Date();
    appointment = new Appointment({
      date: mockDate,
      name: 'Event',
      user_id: [mockUserId1, mockUserId2],
    });
  });

  it('has a date', () => {
    expect(appointment.date).toBe(mockDate);
  });

  it('has a name', () => {
    expect(appointment.name).toBe('Event');
  });

  it('has one of two Users in user_id', () => {
    expect(appointment.user_id[0]).toEqual(mockUserId1);
  });

  it('has two of two Users in user_id', () => {
    expect(appointment.user_id[1]).toEqual(mockUserId2);
  });

  it('can save an appointment', (done) => {
    appointment.save((err) => {
      expect(err).toBeNull();

      Appointment.find((error, appointments) => {
        expect(error).toBeNull();

        expect(appointments[0]).toMatchObject({
          date: mockDate,
          name: 'Event',
          user_id: [mockUserId1, mockUserId2],
        });
        done();
      });
    });
  });
});

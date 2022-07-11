/* eslint-disable array-callback-return */
const mongoose = require('mongoose');

require('../mongodb_helper');
const User = require('../../models/user');

describe('User model', () => {
  let user;
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
    user = new User({
      name: 'Test name',
      email: 'test@test.com',
      password: 'Test password',
    });
  });

  it('has a name', () => {
    expect(user.name).toBe('Test name');
  });

  it('has an email', () => {
    expect(user.email).toBe('test@test.com');
  });

  it('has a password', () => {
    expect(user.password).toBe('Test password');
  });

  it('can save a user', (done) => {
    user.save((err) => {
      expect(err).toBeNull();

      User.find((error, users) => {
        expect(error).toBeNull();

        expect(users[0]).toMatchObject({
          name: 'Test name',
          email: 'test@test.com',
          password: 'Test password',
        });
        done();
      });
    });
  });
});

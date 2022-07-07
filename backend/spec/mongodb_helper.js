/* eslint-disable no-undef */
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll((done) => {
  mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', () => {
    done();
  });
});

afterAll((done) => {
  mongoose.connection.close(true, () => {
    done();
  });
});

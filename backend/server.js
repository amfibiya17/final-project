/* eslint-disable consistent-return */
/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

const homeRouter = require('./routes/home');
const userRouter = require('./routes/users');
const appointmentRouter = require('./routes/appointments');

const User = require('./models/user');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', homeRouter);
app.use('/users', userRouter);
app.use('/appointments', appointmentRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & listening on port ${process.env.PORT}`);
    });
  }).catch((err) => {
    console.log(err);
  });

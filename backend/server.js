require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/users');
const appointmentRoutes = require('./routes/appointments');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/users', userRoutes);
app.use('/appointments', appointmentRoutes);

var mongoDbUrl = process.env.MONGO_URI || "mongodb://localhost:27017/final-project"

mongoose.connect(mongoDbUrl)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & listening on port ${process.env.PORT}`);
    });
  }).catch((err) => {
    console.log(err);
  });

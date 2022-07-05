import express from 'express';
import mongoose from 'mongoose';
import  cors from 'cors';
import "dotenv/.js";
// import dbo from './db/conn';

import dotenv from './.env';

import UserModel from './models/User.js';
import { validationResult } from 'express-validator';
import { registerValidation } from './validations/auth.js';

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connecting to DB & listening on PORT ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.post('/auth/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array);
    }
  
    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: req.body.password,
    });
  
    const user = await doc.save();

    res.json({
      success: true,
    })
  
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Sign up is unsuccessful',
    });
  }
})

app.listen(PORT, () => {
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

process.env;

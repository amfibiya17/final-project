require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userRoutes = require('./routes/users');
const User = require('./models/users');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & listening on port ${process.env.PORT}`);
    });
  }).catch((err) => {
    console.log(err);
  });

app.post('/users/signup', async (req, res) => {
  console.log(req.body);
  try {
    const newPassword = await req.body.password;
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.json({ status: 'ok' });
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate email' });
  }
});

app.post('/users/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: 'error', error: 'Invalid login' };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password,
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      'secret123',
    );

    return res.json({ status: 'ok', user: token });
  }
  return res.json({ status: 'error', user: false });
});

app.get('/calendar', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'secret123');
    const { email } = decoded;
    const user = await User.findOne({ email });

    return res.json({ status: 'ok', quote: user.quote });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'invalid token' });
  }
});

app.post('/calendar', async (req, res) => {
  const token = req.headers['x-access-token'];

  try {
    const decoded = jwt.verify(token, 'secret123');
    const { email } = decoded;
    await User.updateOne(
      { email },
      { $set: { quote: req.body.quote } },
    );

    return res.json({ status: 'ok' });
  } catch (error) {
    console.log(error);
    res.json({ status: 'error', error: 'invalid token' });
  }
});

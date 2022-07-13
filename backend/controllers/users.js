/* eslint-disable camelcase */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UserController = {

  GetUserId: async (req, res) => {
    const token = req.headers['x-access-token'];

    const userId = jwt.verify(token, 'secretPassword123', (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized!' });
      }
      return decoded.user_id;
    });

    return res.json(userId);
  },

  GetAllUsers: async (req, res) => {
    // console.log('req', req.query);
    const { user_id } = req.query;
    // console.log('user_id', user_id);
    try {
      const users = await User.find({ _id: { $ne: user_id } }).select('name');
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  CreateNewUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  LoginUser: async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      const token = jwt.sign({
        // eslint-disable-next-line no-underscore-dangle
        user_id: user._id,
      }, 'secretPassword123');

      return res.json({ status: 'ok', user: token });
    }

    return res.json({ status: 'error', user: false });
  },
};

module.exports = UserController;

/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const User = require('../models/user');

const UserController = {
  Index: (req, res) => {
    User.find()
      .exec((err, users) => {
        if (err) {
          throw err;
        }
        const reversedUsers = users.reverse();

        const result = reversedUsers.filter((user) => user._id !== req.session.user._id);

        res.render('users/index', {
          session: req.session.user,
          users: result,
        });
      });
  },

  CreateNewUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.create({ name, email, password });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  LoginUser: async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return { status: 'error', error: 'Invalid login' };
    }

    const isPasswordValid = req.body.password === user.password;
    // TODO: Encrypt passwords in Mongo
    // const isPasswordValid = await bcrypt.compare(
    //   req.body.password,
    //   user.password,
    // );

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
  },
};

module.exports = UserController;

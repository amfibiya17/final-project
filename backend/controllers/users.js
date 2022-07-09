const User = require('../models/user');

const UserController = {

  CreateNewUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      await User.create({ name, email, password });
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
      return res.json({ status: 'ok', user: true });
    }

    return res.json({ status: 'error', user: false });
  },
};

module.exports = UserController;

const User = require('../models/users')

const createNewUser = async (req, res) => {
  const {name, email, password} = req.body

  try {
    const user = await User.create({name, email, password})
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {
  createNewUser
}
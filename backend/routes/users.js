const express = require('express')
const UserController = require('../controllers/users')
const router = express.Router()

router.post('/signup', UserController.CreateNewUser)
router.get('/login', UserController.LoginUser)

module.exports = router
const express = require('express');
const UserController = require('../controllers/users');

const router = express.Router();

router.post('/signup', UserController.CreateNewUser);
router.post('/login', UserController.LoginUser);
router.get('/userId', UserController.GetUserId);

module.exports = router;

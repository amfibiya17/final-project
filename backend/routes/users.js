const express = require('express');
const UserController = require('../controllers/users');

const router = express.Router();

router.get('/', UserController.Index);
router.post('/signup', UserController.CreateNewUser);
router.post('/login', UserController.LoginUser);

module.exports = router;

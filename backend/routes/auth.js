const express = require('express');
const { registerUsers, loginUser, logoutUser } = require('../controller/authController');
const router = express.Router();

router.route('/register').post(registerUsers);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
module.exports = router;
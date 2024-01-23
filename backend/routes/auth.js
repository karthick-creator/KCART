const express = require('express');
const { registerUsers, loginUser, logoutUser, forgotPassword } = require('../controller/authController');
const router = express.Router();

router.route('/register').post(registerUsers);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);

module.exports = router;
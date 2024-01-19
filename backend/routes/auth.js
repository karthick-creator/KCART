const express = require('express');
const { registerUsers, loginUser } = require('../controller/authController');
const router = express.Router();

router.route('/register').post(registerUsers);
router.route('/login').post(loginUser);

module.exports = router;
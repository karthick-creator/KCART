const express = require('express');
const { registerUsers } = require('../controller/authController');
const router = express.Router();

router.route('/register').post(registerUsers);

module.exports = router;
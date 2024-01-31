const express = require('express');
const { registerUsers, 
        loginUser, 
        logoutUser, 
        forgotPassword, 
        resetPassword, 
        getUserProfile, 
        changePassword, 
        updateProfile} = require('../controller/authController');       
const { isAuthenticatedUser } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/register').post(registerUsers);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myProfile').get(isAuthenticatedUser,getUserProfile);
router.route('/password/change').put(isAuthenticatedUser,changePassword);
router.route('/update').put(isAuthenticatedUser, updateProfile);

module.exports = router;
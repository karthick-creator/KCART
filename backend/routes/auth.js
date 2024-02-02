const express = require('express');
const { registerUsers, 
        loginUser, 
        logoutUser, 
        forgotPassword, 
        resetPassword, 
        getUserProfile, 
        changePassword, 
        updateProfile,
        getAllUsers,
        getUser,
        updateUser,
        deleteUser} = require('../controller/authController');       
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/register').post(registerUsers);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myProfile').get(isAuthenticatedUser,getUserProfile);
router.route('/password/change').put(isAuthenticatedUser,changePassword);
router.route('/update').put(isAuthenticatedUser, updateProfile);

//admin routes
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, authorizeRoles('admin'), getUser)
			      .post(isAuthenticatedUser, authorizeRoles('admin'), updateUser)
			      .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

module.exports = router;
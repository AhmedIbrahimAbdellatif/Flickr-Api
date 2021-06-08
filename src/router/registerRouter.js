const express = require('express');
const registerController = require('../controllers/registerController');
const router = new express.Router();
const {auth} = require('../middleware/authentication');

//Import Middlewares
const {
    validateChangePassword,
    validateRequest,
    validateSignUp,
    validateLogIn,
    validateUserEmailBody,
    validateRegisterWithFacebook,
    validateResetPassword
} = require('../middleware/requestValidator');

router.post(
    '/signUp',
    validateSignUp,
    validateRequest,
    registerController.signUp
);
router.post(
    '/signUpWithFacebook',
    validateRegisterWithFacebook, 
    validateRequest, 
    registerController.signUpWithFacebook
    );

router.post(
    '/loginWithFacebook',
    validateRegisterWithFacebook, 
    validateRequest, 
    registerController.loginnWithFacebook
    );

router.post(
    '/logIn', 
    validateLogIn, 
    validateRequest, 
    registerController.logIn
    );

router.post(
    '/logOut', 
    auth, 
    registerController.logOut
    );

router.post(
    '/changePassword', 
    auth, 
    validateChangePassword, 
    validateRequest, 
    registerController.changePassword);

router.post(
    '/forgetPassword', 
    validateUserEmailBody, 
    validateRequest, 
    registerController.forgetPassword
    );

router.post(
    '/resetPassword', 
    validateResetPassword, 
    validateRequest, 
    registerController.resetPassword
    );
module.exports = router;

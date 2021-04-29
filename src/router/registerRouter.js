const express = require('express');
const registerController = require('../controllers/registerController');
const router = new express.Router();

//Import Middlewares
const {
    validateRequest,
    validateSignUp,
    validateLogIn,
} = require('../middleware/request-validator');

router.post(
    '/signup',
    validateSignUp,
    validateRequest,
    registerController.signUp
);

router.post('/login', validateLogIn, validateRequest, registerController.logIn);

module.exports = router;

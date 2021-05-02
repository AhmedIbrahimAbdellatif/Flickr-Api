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
    '/signUp',
    validateSignUp,
    validateRequest,
    registerController.signUp
);

router.post('/logIn', validateLogIn, validateRequest, registerController.logIn);

module.exports = router;

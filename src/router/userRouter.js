const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');

const {
    validateRequest,
    validateUserIdParam,
} = require('../middleware/request-validator');

router.get('/fav/:userId', validateUserIdParam, validateRequest, userController.getFavorites);

module.exports = router;

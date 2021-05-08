const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authentication');

const {
    validateRequest,
    validateUserIdParam,
    validateUserIdBody
} = require('../middleware/request-validator');
const { validate } = require('../model/userModel');

router.get('/fav/:userId', validateUserIdParam, validateRequest, userController.getFavorites);

router.post('/followUser', auth, validateUserIdBody, validateRequest, userController.followUser);

router.post('/unfollowUser', auth, validateUserIdBody, validateRequest, userController.unfollowUser);

router.get('/followers/:userId', validateUserIdParam, validateRequest, userController.getFollowers);

router.get('/followings/:userId', validateUserIdParam, validateRequest, userController.getFollowings);

router.get('/about/:userId', validateUserIdParam, validateRequest, userController.getUserAbout)
module.exports = router;

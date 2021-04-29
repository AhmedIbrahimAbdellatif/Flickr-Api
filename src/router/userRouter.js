const express = require('express');
const router = new express.Router();
const userController = require('../controllers/userController');

router.get('/fav/:userId', userController.getFavorites);

module.exports = router;

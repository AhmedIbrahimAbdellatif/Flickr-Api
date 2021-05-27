const express = require('express');
const router = new express.Router();
const tagController = require('../controllers/tagController');
const auth = require('../middleware/authentication');

router.get('/trending', tagController.getTrendingTags);

module.exports = router;
const express = require('express');
const router = new express.Router();
const tagController = require('../controllers/tagController');
const auth = require('../middleware/authentication');
const { validateTag } = require('../middleware/request-validator');

router.get('/trending', validateTag, tagController.getTrendingTags);

module.exports = router;

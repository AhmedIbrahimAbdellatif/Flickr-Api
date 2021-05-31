const express = require('express');
const router = new express.Router();
const tagController = require('../controllers/tagController');
const auth = require('../middleware/authentication');
const {
    validateRequest,
    validateSearchKeywordParam,
    validateTag,
} = require('../middleware/request-validator');

router.get('/trending', validateTag, tagController.getTrendingTags);
router.get('/search/:searchKeyword', validateSearchKeywordParam, validateRequest, tagController.searchTags);

module.exports = router;

const express = require('express');
const router = new express.Router();
const tagController = require('../controllers/tagController');

const {
    validateRequest,
    validateTag,
    validateTagParam,
} = require('../middleware/request-validator');

router.get(
    '/trending',
    validateRequest,
    tagController.getTrendingTags
);

router.get(
    '/:tagName',
    validateRequest,
    validateTagParam,
    tagController.getTagMedia
);

module.exports = router;

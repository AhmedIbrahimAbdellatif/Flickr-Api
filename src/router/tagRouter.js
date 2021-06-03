const express = require('express');
const router = new express.Router();
const tagController = require('../controllers/tagController');
const { authOptional } =require('../middleware/authentication'); 
const {
    validateRequest,
    validateTag,
    validateTagParam,
    validateSearchKeywordParam
} = require('../middleware/requestValidator');
const auth = require('../middleware/authentication');
router.get(
    '/trending',
    validateRequest,
    tagController.getTrendingTags
);

router.get(
    '/:tagName',
    authOptional,
    validateRequest,
    validateTagParam,
    tagController.getTagMedia
);
router.get('/search/:searchKeyword', validateSearchKeywordParam, validateRequest, tagController.searchTags);


module.exports = router;

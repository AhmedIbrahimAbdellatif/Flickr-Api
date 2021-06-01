const express = require('express');
const router = new express.Router();
const photoController = require('../controllers/photoController');
const auth = require('../middleware/authentication');

//Import Middlewares
const {
    validateRequest,
    validatePhotoId,
    validatePhotoIdParam,
    validatePhotoUpload,
    validateTag,
    validateComment,
} = require('../middleware/request-validator');
const { upload } = require('../middleware/photo-multer-handler');

router.post(
    '/upload',
    auth,
    upload.single('file'),
    validatePhotoUpload,
    validateRequest,
    photoController.uploadImage
);

router.post(
    '/addToFavorites',
    auth,
    validatePhotoId,
    validateRequest,
    photoController.addToFavorites
);

router.patch(
    '/addTags/:photoId',
    auth,
    validateRequest,
    validatePhotoIdParam,
    validateTag,
    photoController.addTagToPhoto
);

router.get(
    '/whoFavorited/:photoId',
    validatePhotoIdParam,
    validateRequest,
    photoController.whoFavorited
);
router.post(
    '/getComments',
    validatePhotoId,
    validateRequest,
    photoController.getMediaComments
);
router.post(
    '/:photoId/comment',
    auth,
    validatePhotoIdParam,
    validateComment,
    validateRequest,
    photoController.commentOnPhoto
);
module.exports = router;

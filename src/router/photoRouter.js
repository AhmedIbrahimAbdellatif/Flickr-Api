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
    validatePhotoId,
    photoController.addTagToPhoto
);

router.get(
    '/whoFavorited/:photoId',
    validatePhotoIdParam,
    validateRequest,
    photoController.whoFavorited
);
module.exports = router;

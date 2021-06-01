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
} = require('../middleware/request-validator');
const { upload } = require('../middleware/photoMulterHandler');


router.post(
    '/upload', 
    auth, 
    upload.single('file'),
    validatePhotoUpload,
    validateRequest ,
    photoController.uploadPhoto
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

router.delete(
    '/delete/:photoId', 
    validatePhotoIdParam, 
    validateRequest, 
    photoController.deletePhoto
);

router.post(
    '/getDetails',
    auth, 
    validatePhotoId,
    validateRequest,
    photoController.getPhotoDetails
);
module.exports = router;

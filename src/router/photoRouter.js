const express = require('express');
const router = new express.Router();
const photoController = require('../controllers/photoController');
const { auth, authOptional} = require('../middleware/authentication');

//Import Middlewares
const {
    validateRequest,
    validatePhotoId,
    validatePhotoIdParam,
    validatePhotoUpload,
    validateTag,
    validateComment,
    validateCommentId,
    validateEditPhoto,
} = require('../middleware/requestValidator');
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
    authOptional,
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

router.delete(
    '/:photoId/comment',
    auth,
    validatePhotoIdParam,
    validateCommentId,
    validateRequest,
    photoController.deleteComment
);

router.delete(
    '/delete/:photoId', 
    validatePhotoIdParam, 
    validateRequest, 
    photoController.deletePhoto
);

router.post(
    '/getDetails',
    authOptional, 
    validatePhotoId,
    validateRequest,
    photoController.getPhotoDetails
);

router.patch(
    '/:photoId',
    validatePhotoIdParam,
    validateEditPhoto,
    validateRequest,
    photoController.editPhoto
);
router.get(
    '/explore',
    photoController.explorePhotos
);
module.exports = router;

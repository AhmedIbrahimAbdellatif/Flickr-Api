const express = require('express');
const router = new express.Router();
const albumController = require('../controllers/albumController');
const {auth,authOptional} = require('../middleware/authentication');

//Import Middlewares
const {
    validateRequest,
    validateCreateAlbum,
    validateAlbumParam,
    validateAlbumId,
    validatePhotoId,
    validateEditAlbum,
} = require('../middleware/requestValidator');

router.post('/createAlbum', auth, validateCreateAlbum, validateRequest ,albumController.createAlbum);
router.delete('/deleteAlbum/:albumId', auth, validateAlbumParam, validateRequest, albumController.deleteAlbum);
router.post('/addPhoto', auth, validatePhotoId, validateAlbumId, validateRequest ,albumController.addPhoto);
router.delete('/deletePhoto', auth, validatePhotoId, validateAlbumId, validateRequest ,albumController.deletePhoto);
router.get('/:albumId',authOptional, validateAlbumParam, validateRequest, albumController.viewAlbumMedia);
router.patch('/:albumId', validateAlbumParam, validateEditAlbum, validateRequest, albumController.editAlbum);

module.exports = router;

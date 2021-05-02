const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const router = new express.Router();
var fs = require('fs');
const photoController = require('../controllers/photoController');
const auth = require('../middleware/authentication');

//Import Middlewares
const {
    validateRequest,
    validatePhotoIdParam,
    validatePhotoUpload
} = require('../middleware/request-validator');

const upload = multer({
    dest: function (req, file, callback) {
        if (!fs.existsSync('public/images')) {
            fs.mkdirSync('public/images');
        }
        if (!fs.existsSync(`public/images/${req.user._id}`)) {
            fs.mkdirSync(`public/images/${req.user._id}`);
        }
        callback(null, `public/images/${req.user._id}`);
    },
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|tiff)$/)) {
            return callback(new Error('Invalid file extension'));
        }
        req.body.file = true
        callback(undefined, true);
    },
});

router.post('/upload', auth, upload.single('file'),validatePhotoUpload,validateRequest ,photoController.uploadImage);

router.post('/addToFavorites', auth, photoController.addToFavorites);

router.get('/whoFavorited/:photoId', validatePhotoIdParam, validateRequest, photoController.whoFavorited);
module.exports = router;

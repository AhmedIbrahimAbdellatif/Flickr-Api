const multer = require('multer');
const mongoose = require('mongoose');
var fs = require('fs');
const { LogicError } = require('../error/logicError')
storage = multer.diskStorage({
    destination: function (req, file, callback) {
        if (!fs.existsSync('public')) {
            fs.mkdirSync('public');
        }
        if (!fs.existsSync('public/images')) {
            fs.mkdirSync('public/images');
        }
        if (!fs.existsSync(`public/images/${req.user._id}`)) {
            fs.mkdirSync(`public/images/${req.user._id}`);
        }
        callback(null, `public/images/${req.user._id}`);
    },
    filename: function(req, file, callback) {
        uniqueFileName = mongoose.Types.ObjectId();
        extension = file.originalname.split('.').pop();
        callback(null, uniqueFileName+'.'+extension);
    }
})
module.exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|tiff)$/i)) {
            return callback(new LogicError(400,'Invalid file extension'));
        }
        req.body.file = true
        callback(undefined, true);
    },
});
const multer = require('multer');
var fs = require('fs');
const { LogicError } = require('../error/logic-error')
module.exports.upload = multer({
    dest: function (req, file, callback) {
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
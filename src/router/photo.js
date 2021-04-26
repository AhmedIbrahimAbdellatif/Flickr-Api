const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router();
var fs = require('fs');
const Photo = require('../model/photo')

const auth = require('../middleware/authentication')
const upload = multer({
    dest: function (req, file, callback) {
        if (!fs.existsSync(`public/images/${req.user._id}`)) {
            fs.mkdirSync(`public/images/${req.user._id}`);
        }
        callback(null, `public/images/${req.user._id}`)
    },
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(png|jpg|tiff)$/)) {
            return callback(new Error('Invalid file extension'))
        }
        callback(undefined, true)
    }
})

router.post('/upload', auth, upload.single('file'), async (req, res) => {
    try {
        reqBody = {...req.body}
        delete reqBody['file'] 
        const photo = new Photo({
            ...reqBody,
            url: '/images/uploads/' + req.file.filename,
            creator: req.user._id,
        })
        console.log(photo)
        await photo.save()
        res.status(201).send({ url: photo.url })
    }
    catch (error) {
        res.send(400).send(error)
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// router.post('/upload', auth, upload.single('file'), async (req, res) => {
//     console.log(req.body.title)
//     // console.log(req.user)
//     reqBody = { ...req.body }
//     delete reqBody['file']
//     const photo = new Photo({
//         ...reqBody,
//         url: '/images/uploads/' + req.file.filename,
//         creator: req.user._id,
//     })
//     await photo.save()
//     res.status(201).send({ url: photo.url })
// })

module.exports = router
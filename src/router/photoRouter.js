const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router();
var fs = require('fs');
const Photo = require('../model/photoModel')

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
        reqBody = { ...req.body }
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

router.post('/addToFavorites', auth, async (req, res) => {
    if(!req.body.photoId) {
        res.status(400).send({
            error: 'Photo Id is missing'
        })
        return
    }
    const photo = await Photo.findById(req.body.photoId)
    if(!photo){
        res.status(404).send({
            error: 'Photo is not found'
        })
        return
    }
    req.user.favourites.push(photo._id)
    await req.user.save()
    res.send()
})

router.get('/whoFavorited/:photoId', async(req, res)=>{
    
    if(!req.params.photoId) {
        res.status(400).send({
            error: 'Photo Id is missing'
        })
        return
    }
    const photo = await Photo.findById(req.params.photoId)
    if(!photo){
        res.status(404).send({
            error: 'Photo is not found'
        })
        return
    }
    await photo.populate({
        path: 'favoured'
    }).execPopulate()
    res.send(photo.favoured)
    
})
module.exports = router
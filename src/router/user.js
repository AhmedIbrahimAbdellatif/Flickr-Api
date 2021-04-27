const express = require('express')
const router = new express.Router();
const mongoose = require('mongoose')

const User = require('../model/user')
const Photo = require('../model/photo')

router.get('/fav/:userId', async (req, res) => {
    try {
        console.log('inside fav')
        if(!req.params.userId) {
            res.status(400).send({
                error: 'User Id is missing'
            })
            return
        }
        const user = await User.findById(req.params.userId)
        console.log(user)
        if (!user) {
            res.status(404).send({
                error: 'User is not found'
            })
            return
        }
        favouritesArray = []
        user['favourites'].forEach((photoId) => favouritesArray.push(mongoose.Types.ObjectId(photoId)))
        Photo.find({
            '_id': { $in: favouritesArray }
        }, function (err, docs) {
            res.send(docs)
        })
    }
    catch (error) {
        res.status(500).send()
    }
})

module.exports = router
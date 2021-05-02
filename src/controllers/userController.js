const User = require('../model/userModel');
const Photo = require('../model/photoModel');
const mongoose = require('mongoose');

module.exports.getFavorites = async (req, res) => {
    try {
        console.log('inside fav');
        if (!req.params.userId) {
            res.status(400).send({
                error: 'User Id is missing',
            });
            return;
        }
        const user = await User.findById(req.params.userId);
        console.log(user);
        if (!user) {
            res.status(404).send({
                error: 'User is not found',
            });
            return;
        }
        favouritesArray = [];
        user['favourites'].forEach((photoId) =>
            favouritesArray.push(mongoose.Types.ObjectId(photoId))
        );
        const photos = await Photo.find({
            _id: { $in: favouritesArray },
        });

        res.send(photos);
    } catch (error) {
        res.status(500).send();
    }
};

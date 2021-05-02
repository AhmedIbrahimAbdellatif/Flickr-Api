const User = require('../model/userModel');
const Photo = require('../model/photoModel');
const mongoose = require('mongoose');
const { LogicError } = require('../error/logic-error');

module.exports.getFavorites = async (req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) {
        throw new LogicError(404, 'User is not found');
    }
    favouritesArray = [];
    user['favourites'].forEach((photoId) =>
        favouritesArray.push(mongoose.Types.ObjectId(photoId))
    );
    const photos = await Photo.find({
        _id: { $in: favouritesArray },
    });

    res.send(photos);
};

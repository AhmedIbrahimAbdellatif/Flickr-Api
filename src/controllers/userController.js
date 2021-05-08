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
    // user['favourites'].forEach((photoId) =>
    //     favouritesArray.push(mongoose.Types.ObjectId(photoId))
    // );
    const photos = await Photo.find({
        _id: { $in: user['favourites'] },
    }).populate(
        {
            path: 'creator',
            select: ['_id', 'firstName', 'lastName']
        }
    ).exec();
    res.send({favorites: photos});
};
module.exports.followUser = async (req, res) => {
    const user = req.user;
    await User.findByIdAndUpdate(user._id, {
        $addToSet: {following: req.body.userId}
    });
    res.send();
};
module.exports.unfollowUser = async (req, res) => {
    const user = req.user;
    await User.findByIdAndUpdate(user._id, {
        $pull: {following: req.body.userId}
    });
    res.send();
};
module.exports.getFollowers = async(req, res) => {
    const user = await User.findById(req.params.userId);
    await user.populate({path: 'followers', select: '_id firstName lastName -following'}).execPopulate();
    res.send({followers: user.followers});
};

module.exports.getFollowings = async(req, res) => {
    const user = await User.findById(req.params.userId);
    await user.populate({path: 'following', select: '_id firstName lastName'}).execPopulate();
    res.send({following: user.following});
    
};

//Add Statistics
module.exports.getUserAbout = async(req,res) => {
    const user = await User.findById(req.params.userId).populate({
        path:'showCase',
        populate: {
            path: 'creator',
            select: 'firstName lastName _id'
        }
    }).exec();
    if(!user) throw new LogicError(404, 'User not found')
    const statistics = {
        view: 0,
        groups: 0,
        faves: 0
    };
    res.send({...user._doc, statistics});
}

module.exports.getUserPhotoStream = async(req,res) => {
    const photos = await Photo.find({
        creator: req.params.userId,
        isPublic: true
    }).populate({
        path: 'creator',
        select: 'firstName lastName _id'
        
    }).exec();


    res.send({photos});
}
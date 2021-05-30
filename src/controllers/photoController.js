const Photo = require('../model/photoModel');
const Tag = require('../model/tagModel');
const Comment = require('../model/commentModel');
const { LogicError } = require('../error/logic-error');

module.exports.uploadImage = async (req, res) => {
    reqBody = { ...req.body };
    delete reqBody['file'];
    const photo = new Photo({
        ...reqBody,
        url:
            process.env.HOSTNAME +
            req.file.path.toString().replaceAll('\\', '/'),
        creator: req.user._id,
    });
    photo.favouriteCount = 0;
    await photo.save();
    res.status(201).send({ url: photo.url });
};

module.exports.addToFavorites = async (req, res) => {
    const photo = await Photo.findById(req.body.photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }
    if (!req.user.favourites.includes(photo._id)) {
        req.user.favourites.push(photo._id);
        await req.user.save();
        photo.favouriteCount = photo.favouriteCount + 1;
        await photo.save();
    }
    res.send();
};

module.exports.whoFavorited = async (req, res) => {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }
    await photo
        .populate({
            path: 'favoured',
            select: ['firstName', 'lastName', '-favourites'],
        })
        .execPopulate();
    res.send({ user: photo.favoured });
};

module.exports.addTagToPhoto = async (req, res) => {
    const tagName = req.body.tag;
    let tag = await Tag.findOne({ name: tagName });
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo Not Found');
    }
    if (!tag) {
        tag = await Tag.create({ name: tagName });
    }
    let found = false;
    for (var i = 0; i < photo.tags.length; i++) {
        if (photo.tags[i].toString() === tag._id.toString()) {
            found = true;
        }
    }
    if (!found) {
        await tag.updateOne({ $inc: { count: 1 } });
        await photo.updateOne({ $push: { tags: tag } });
        res.status(200).json({
            message: 'Tag Added to photo successfully',
        });
    }
    res.status(409).json({
        message: 'Tag already exists in this photo add another tag',
    });
};

module.exports.commentOnPhoto = async (req, res) => {
    const userId = req.user._id;
    const comment = req.body.comment;
    const photoId = req.params.photoId;
    const photo = await Photo.findById(photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo Not Found');
    }
    const newComment = await Comment.create({
        creator: userId,
        text: comment,
        photo: photoId,
    });
    await photo.updateOne({ $push: { comments: newComment } });
    res.status(200).json({
        message: 'Comment Added Successfully',
    });
};

module.exports.getMediaComments = async (req, res) => {
    const photo = await Photo.findById(req.params.photoId).populate('comments');
    if (!photo) {
        throw new LogicError(404, 'Photo Not Found');
    }
    const comments = photo.comments;
    res.status(200).json({
        comments,
    });
};

const Photo = require('../model/photoModel');
const { LogicError } = require('../error/logic-error');

module.exports.uploadImage = async (req, res) => {
    reqBody = { ...req.body };
    delete reqBody['file'];
    const photo = new Photo({
        ...reqBody,
        url: '/images/uploads/' + req.file.filename,
        creator: req.user._id,
    });
    await photo.save();
    res.status(201).send({ url: photo.url });
};

module.exports.addToFavorites = async (req, res) => {
    const photo = await Photo.findById(req.body.photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }
    req.user.favourites.push(photo._id);
    await req.user.save();
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
        })
        .execPopulate();
    res.send(photo.favoured);
};

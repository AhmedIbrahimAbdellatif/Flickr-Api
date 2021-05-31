const Photo = require('../model/photoModel');
const Album = require('../model/albumModel');
const { LogicError } = require('../error/logic-error');

module.exports.uploadPhoto = async (req, res) => {
    reqBody = { ...req.body };
    delete reqBody['file'];
    const photo = new Photo({
        ...reqBody,
        url: process.env.HOSTNAME + req.file.path.toString().replaceAll('\\','/'),
        creator: req.user._id,
    });
    photo.favouriteCount = 0;
    await photo.save();
    res.status(201).send({ url: photo.url });
};

module.exports.deletePhoto = async (req, res) => {
    photoId = req.params.photoId;
    const photo = await Photo.findById(photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }
    photo.albums.forEach(async function (albumId) {
        await Album.findByIdAndUpdate(albumId, {
            $pull: {photoIds: photoId}
        });
    })
    await photo.remove();
    res.status(200).send();
};

module.exports.addToFavorites = async (req, res) => {
    const photo = await Photo.findById(req.body.photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }
    if(!req.user.favourites.includes(photo._id)){
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
            select: ['firstName', 'lastName', '-favourites']
        })
        .execPopulate();
    res.send({user: photo.favoured});
};

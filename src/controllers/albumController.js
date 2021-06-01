const Album = require('../model/albumModel');
const Photo = require('../model/photoModel');
const { LogicError } = require('../error/logic-error');

module.exports.createAlbum = async (req, res) => {
    
    reqBody = { ...req.body };
    const album = new Album({
        ...reqBody,
        creator: req.user._id,
    });
    album.views = 0;
    await album.save();
    res.status(201).send({album: album});
};

module.exports.deleteAlbum = async (req, res) => {
    const album = await Album.findOneAndDelete({ _id: req.params.albumId, creator: req.user._id })
    if(!album) {
        throw new LogicError(404, 'Album is not found');
    }
    res.status(200).send();
};

module.exports.addPhoto = async (req, res) => {
    const photoId = req.body.photoId;
    const albumId = req.body.albumId;
    const isAlbumExist = await Album.exists({_id: albumId});
    const isPhotoExist = await Photo.exists({_id: photoId});
    if(!isAlbumExist) {
        throw new LogicError(404, 'Album is not found');
    }
    if(!isPhotoExist) {
        throw new LogicError(404, 'Photo is not found');
    }
    await Album.findByIdAndUpdate(albumId, {
        $addToSet: {photoIds: photoId}
    });
    await Photo.findByIdAndUpdate(photoId, {
        $addToSet: {albums: albumId}
    });
    res.status(200).send();
}

module.exports.deletePhoto = async (req, res) => {
    const photoId = req.body.photoId;
    const albumId = req.body.albumId;
    const isAlbumExist = await Album.exists({_id: albumId});
    const photo = await Photo.exists({_id: photoId});
    if(!isAlbumExist) {
        throw new LogicError(404, 'Album is not found');
    }
    if(!photo) {
        throw new LogicError(404, 'Photo is not found');
    }
    await Album.findByIdAndUpdate(albumId, {
        $pull: {photoIds: photoId}
    });
    res.status(200).send();
}
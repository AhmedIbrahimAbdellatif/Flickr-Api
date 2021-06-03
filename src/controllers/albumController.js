const Album = require('../model/albumModel');
const Photo = require('../model/photoModel');
const { LogicError } = require('../error/logicError');

module.exports.createAlbum = async (req, res) => {

    reqBody = { ...req.body };
    const album = new Album({
        ...reqBody,
        creator: req.user._id,
    });
    album.views = 0;
    await album.save();
    res.status(201).send({ album: album });
};

module.exports.deleteAlbum = async (req, res) => {
    const album = await Album.findOneAndDelete({ _id: req.params.albumId, creator: req.user._id })
    if (!album) {
        throw new LogicError(404, 'Album is not found');
    }
    res.status(200).send();
};

module.exports.addPhoto = async (req, res) => {
    const photoId = req.body.photoId;
    const albumId = req.body.albumId;
    const isAlbumExist = await Album.exists({ _id: albumId });
    const isPhotoExist = await Photo.exists({ _id: photoId });
    if (!isAlbumExist) {
        throw new LogicError(404, 'Album is not found');
    }
    if (!isPhotoExist) {
        throw new LogicError(404, 'Photo is not found');
    }
    await Album.findByIdAndUpdate(albumId, {
        $addToSet: { photoIds: photoId }
    });
    await Photo.findByIdAndUpdate(photoId, {
        $addToSet: { albums: albumId }
    });
    res.status(200).send();
}

module.exports.deletePhoto = async (req, res) => {
    const photoId = req.body.photoId;
    const albumId = req.body.albumId;
    const isAlbumExist = await Album.exists({ _id: albumId });
    const photo = await Photo.exists({ _id: photoId });
    if (!isAlbumExist) {
        throw new LogicError(404, 'Album is not found');
    }
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }
    await Album.findByIdAndUpdate(albumId, {
        $pull: { photoIds: photoId }
    });
    res.status(200).send();
}
module.exports.viewAlbumMedia = async (req, res) => {
    const albumId = req.params.albumId;
    const album = await Album.findById(albumId).populate({
        path: 'photoIds',
        populate: [
            {
                path: 'creator'
            },
            {
                path: 'tags'
            }
        ]
    })
    if(!album) throw new LogicError(404, 'Album is not found');
    album.views++;
    await album.save();
    if(req.user){
        console.log('Hena')
        for(let i =0;i<album.photoIds.length;i++){
            req.user.favourites.forEach((id)=> {
                if(id.toString()=== album.photoIds[i].id.toString())
                    album.photoIds[i].isFavourite = true
            })
        }
    }
    res.status(200).send({media: album.photoIds});
};
module.exports.editAlbum = async (req, res) => {
    const albumId = req.params.albumId;
    const update = {};
    if(req.body.title) update.title = req.body.title;
    if(req.body.description) update.description = req.body.description;
    const album = await Album.findByIdAndUpdate(albumId, update);
    if(!album) throw new LogicError(404, 'Album is not Found');
    await album.save();
    res.status(200).send(album);
}
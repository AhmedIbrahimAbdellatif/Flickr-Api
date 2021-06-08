/**
 * Album Controller Module contains Album's route handler
 * @module controlles/album
 */

/**
 * Album Model
 * @const
 */
const Album = require('../model/albumModel');

/**
 * Photo Model
 * @const
 */
const Photo = require('../model/photoModel');

/**
 * LogicError Class used to throw logical error in route handlers
 * @const
 */
const { LogicError } = require('../error/logicError');


/**
 * A function that is used to Create Album.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
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

/**
 * A function that is used to delete Album.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.deleteAlbum = async (req, res) => {
    const album = await Album.findOneAndDelete({ _id: req.params.albumId, creator: req.user._id })
    if (!album) {
        throw new LogicError(404, 'Album is not found');
    }
    res.status(200).send();
};

/**
 * A function that is used to Add Photo to Album.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.addPhoto = async (req, res) => {
    const photoId = req.body.photoId;
    const albumId = req.body.albumId;

    //Check That Album and Photo exits
    const isAlbumExist = await Album.exists({ _id: albumId });
    const isPhotoExist = await Photo.exists({ _id: photoId });
    if (!isAlbumExist) {
        throw new LogicError(404, 'Album is not found');
    }
    if (!isPhotoExist) {
        throw new LogicError(404, 'Photo is not found');
    }

    //Add Photo to the album
    await Album.findByIdAndUpdate(albumId, {
        $addToSet: { photoIds: photoId }
    });
    await Photo.findByIdAndUpdate(photoId, {
        $addToSet: { albums: albumId }
    });
    res.status(200).send();
}

/**
 * A function that is used to Remove Photo From the Album.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.deletePhoto = async (req, res) => {
    const photoId = req.body.photoId;
    const albumId = req.body.albumId;

    //Check if both Album and the Photo provided exists
    const isAlbumExist = await Album.exists({ _id: albumId });
    const photo = await Photo.exists({ _id: photoId });
    if (!isAlbumExist) {
        throw new LogicError(404, 'Album is not found');
    }
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }

    //Remove photo from album
    await Album.findByIdAndUpdate(albumId, {
        $pull: { photoIds: photoId }
    });
    res.status(200).send();
}
/**
 * A function that is used to View Album Media
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.viewAlbumMedia = async (req, res) => {
    const albumId = req.params.albumId;

    //Fetch Album and populate its photos
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

    //Add albums views
    album.views++;
    await album.save();

    //Check If Logged In User has favourited one of the album's photos
    if(req.user){
        for(let i =0;i<album.photoIds.length;i++){
            req.user.favourites.forEach((id)=> {
                if(id.toString()=== album.photoIds[i].id.toString())
                    album.photoIds[i].isFavourite = true
            })
        }
    }
    res.status(200).send({media: album.photoIds});
};

/**
 * A function that is used to Edit Album's Title and Description.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.editAlbum = async (req, res) => {
    const albumId = req.params.albumId;
    const update = {};

    //Check If title or descriptions was included in req.body to make the change
    if(req.body.title) update.title = req.body.title;
    if(req.body.description) update.description = req.body.description;
    
    const album = await Album.findOneAndUpdate({_id: albumId, creator: req.user._id}, update);
    if(!album) throw new LogicError(404, 'Album is not Found');
    await album.save();
    res.status(200).send(album);
}
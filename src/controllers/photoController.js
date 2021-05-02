const Photo = require('../model/photoModel');
module.exports.uploadImage = async (req, res) => {
    try {
        reqBody = { ...req.body };
        delete reqBody['file'];
        const photo = new Photo({
            ...reqBody,
            url: '/images/uploads/' + req.file.filename,
            creator: req.user._id,
        });
        console.log(photo);
        await photo.save();
        res.status(201).send({ url: photo.url });
    } catch (error) {
        res.send(400).send(error);
    }
}

module.exports.addToFavorites = async (req, res) => {
    if (!req.body.photoId) {
        res.status(400).send({
            error: 'Photo Id is missing',
        });
        return;
    }
    const photo = await Photo.findById(req.body.photoId);
    if (!photo) {
        res.status(404).send({
            error: 'Photo is not found',
        });
        return;
    }
    req.user.favourites.push(photo._id);
    await req.user.save();
    res.send();
};

module.exports.whoFavorited = async (req, res) => {
    if (!req.params.photoId) {
        res.status(400).send({
            error: 'Photo Id is missing',
        });
        return;
    }
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
        res.status(404).send({
            error: 'Photo is not found',
        });
        return;
    }
    await photo
        .populate({
            path: 'favoured',
        })
        .execPopulate();
    res.send(photo.favoured);
};

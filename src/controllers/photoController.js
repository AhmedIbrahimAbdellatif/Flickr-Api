const Photo = require('../model/photoModel');
const Tag = require('../model/tagModel');
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
    console.log(tag._id);
    console.log(photo.tags[0]);
    console.log(photo.tags[1]);
    console.log(photo.tags[2]);
    console.log(photo.tags[3]);
    console.log(photo.tags[4]);
    for (var i = 0; i < photo.tags.length; i++) {
        if (photo.tags[i].toString() === tag._id.toString()) {
            console.log('found itttttttttttttttttttttttttttttttttttttttttt');
            found = true;
        }
    }
    if (!found) {
        await tag.updateOne({ $inc: { count: 1 } });
    }
    await photo.updateOne({ $addToSet: { tags: tag } });
    res.status(200).json({
        message: 'Tag Added to photo successfully',
    });
};

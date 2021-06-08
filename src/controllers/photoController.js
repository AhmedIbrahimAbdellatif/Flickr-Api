/**
 * Photo Controller Module contains Photo's route handler
 * @module controlles/photo
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
 * Tag Model
 * @const
 */
const Tag = require('../model/tagModel');

/**
 * Comment Model
 * @const
 */
const Comment = require('../model/commentModel');

/**
 * LogicError Class used to throw logical error in route handlers
 * @const
 */
const { LogicError } = require('../error/logicError');

var fs = require('fs');

/**
 * A function that is used to Upload Photo.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.uploadPhoto = async (req, res) => {
    reqBody = { ...req.body };
    delete reqBody['file'];
    delete reqBody['tags'];

    //Create new Photo Object
    const photo = new Photo({
        ...reqBody,
        url:
            process.env.HOSTNAME +
            req.file.path.toString().replaceAll('\\', '/'),
        creator: req.user._id,
        tags: []
    });
    photo.favouriteCount = 0;
    var tagNames = []

    //If tags where provided Add them to the photo
    if(req.body.tags) {
        req.body.tags = req.body.tags.toString().replaceAll(/[\s\t\n\r]+/g, ''),
        tagNames = req.body.tags.split(',');
    }
    for(let i = 0;i<tagNames.length;i++){
        const tag =await Tag.findOneAndUpdate( {name: tagNames[i]}, {$inc: {count: 1}},  { upsert: true, new: true });
        photo.tags.push(tag._id);
    }
    await photo.save();
    res.status(201).send({ url: photo.url, _id: photo._id, tagIds: photo.tags});

};

/**
 * A function that is used to Delete Photo.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.deletePhoto = async (req, res) => {
    photoId = req.params.photoId;

    //Fetch photo and check if it exists
    const photo = await Photo.findOne({
        _id: photoId,
        creator: req.user._id
    });
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }

    //Remove photo from the albums it belongs to.
    photo.albums.forEach(async function (albumId) {
        await Album.findByIdAndUpdate(albumId, {
            $pull: {photoIds: photoId}
        });
    })

    //Remove photo from the tags
    photo.tags.forEach(async function (tagId) {
        const tag = await Tag.findByIdAndUpdate(tagId, {
            $pull: {photo: photoId},
            $inc: {
                count: -1
            }
        },{
            new: true
        });
        if(tag.count == 0){
            await Tag.findByIdAndDelete(tag._id);
        }
    })

    //Remove photo from server
    const path = photo.url.toString().match(/(public\/images\/.*)/)[0];
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }

    await photo.remove();
    res.status(200).send();
};

/**
 * A function that is used to Add Photo To Favourite.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.addToFavorites = async (req, res) => {

    //Check if Photo exists
    const photo = await Photo.findById(req.body.photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }

    //chec if Photo is Already in users favourites dont add it
    if (!req.user.favourites.includes(photo._id)) {
        req.user.favourites.push(photo._id);
        await req.user.save();
        photo.favouriteCount = photo.favouriteCount + 1;
        await photo.save();
    }
    res.send();
};

/**
 * A function that is Delete Photo from Favourites
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.deleteFromFavorites = async (req, res) => {
    const photo = await Photo.findById(req.body.photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }
    if (req.user.favourites.includes(photo._id)) {
        req.user.favourites.pull(photo._id);
        await req.user.save();
        photo.favouriteCount = photo.favouriteCount - 1;
        await photo.save();
    }
    res.send();
};

/**
 * A function that is used to Get Users who favourited A Photo.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.whoFavorited = async (req, res) => {

    //Check If A Photo exists
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo is not found');
    }
    await photo
        .populate({
            path: 'favoured',
            select: '-showCase',
            populate: [{
                path: 'numberOfFollowers'
            },
            {
                path:'numberOfPhotos'
            }
        ] 
        })
        .execPopulate();

    //Populate isFollowing for LoggedIn User
    const loggedInUser = req.user;
    if(loggedInUser){
        photo.favoured.forEach((user) => {
            for(let i =0 ;i< loggedInUser.following.length;i++){
                if(loggedInUser.following[i].toString() === user._id.toString())
                {
                    user.isFollowing = true;
                    break;
                }
            }

        })
    }
    res.send({ user: photo.favoured });
};

/**
 * A function that is used to Add Tag to Photo.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.addTagToPhoto = async (req, res) => {
    const tagName = req.body.tag;
    let tag = await Tag.findOne({ name: tagName });

    //Check if photo exists
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

/**
 * A function that is used to Comment on A Photo.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.commentOnPhoto = async (req, res) => {
    const userId = req.user._id;
    const comment = req.body.comment;
    const photoId = req.params.photoId;

    //Check that photo exists
    const photo = await Photo.findById(photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo Not Found');
    }

    //Create Comment and Add it to the photo
    const newComment = await Comment.create({
        user: userId,
        text: comment,
        photo: photoId,
    });
    await photo.updateOne({ $push: { comments: newComment } });
    res.status(200).json({
        message: 'Comment Added Successfully',
    });
};

/**
 * A function that is used to Get Photo Comments.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.getMediaComments = async (req, res) => {

    //Checn if photo exists and populate its comments
    const photo = await Photo.findById(req.body.photoId).populate('comments');
    if (!photo) {
        throw new LogicError(404, 'Photo Not Found');
    }
    const comments = photo.comments;
    res.status(200).json({
        comments,
    });
};

/**
 * A function that is used to Delete Comment.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.deleteComment = async (req, res) => {
    const photoId = req.params.photoId;
    const userId = req.user._id;
    const commentId = req.body.commentId;
    const comment = await Comment.findById(commentId);

    //Check that photo and comment exists
    const photo = await Photo.findById(photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo Not Found');
    }
    if (!comment || photoId.toString() != comment.photo.toString()) {
        throw new LogicError(404, 'Comment Not Found');
    }

    //Check taht the user deleting the comment is the comment creator
    if (comment.user._id.toString() != userId.toString()) {
        throw new LogicError(
            403,
            'You do not have permission to delete comments belonging to other users'
        );
    }

    //Update photo comments
    for (var i = 0; i < photo.comments.length; i++) {
        if (photo.comments[i].toString() === comment._id.toString()) {
            photo.comments.splice(i, 1);
        }
    }
    await photo.save();
    await comment.remove();
    res.status(200).json({
        message: 'Comment Deleted Successfully',
    });
};

/**
 * A function that is used to get Photo Details.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.getPhotoDetails = async (req, res) => {

    //Check if Photo exists
    const photo = await Photo.findById(req.body.photoId).populate({
        path:'creator',
        select: '_id lastName firstName userName profilePhotoUrl coverPhotoUrl'
    }).populate({
        path: 'tags'
    })
    if (!photo) {
        throw new LogicError(404, 'Photo Not Found');
    }

    //Populate isFavoruite and isFollowing for loggedIn User
    const user = req.user
    if(user){
        let isFollowing = false;
        user.following.forEach((id) => {
            
            if(id.toString() === photo.creator._id.toString())
                isFollowing = true
        });
        photo.creator.isFollowing = isFollowing
        user.favourites.forEach((id)=> {
            if(id.toString()=== photo.id.toString())
                photo.isFavourite = true
        })
    }

    //Increase photo views
    await photo.updateOne({
        $inc: { views: 1}
    });
    res.status(200).send(photo);
};

/**
 * A function that is used to Edit Photo Details.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.editPhoto = async (req,res) =>{
    const photoId = req.params.photoId;

    //Check That Photo exits
    const photo = await Photo.findById(photoId);
    const tags = [];
    if(!photo) throw new LogicError(404, 'Photo Not Found');

    //Add new Tags to the photo
    for(var i =0; i< req.body.tags.length; i++){
        let tag = await Tag.findOne({name: req.body.tags[i] });
        if(!tag){
            tag = await Tag.create({ name: req.body.tags[i] , count :1});
            await tag.save();
        }else{
            let found = false;
            for (var i = 0; i < photo.tags.length; i++) {
                if (photo.tags[i].toString() === tag._id.toString()) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                await tag.updateOne({ $inc: { count: 1 } });
            }
        }
        tags.push(tag)
    }

    const photoExists = await Photo.findOne({_id: photoId, creator: req.user._id});
    if(!photoExists) throw new LogicError(404, 'Photo Not Found');

    //Update the Photo Details
   const updatedPhoto = await Photo.findByIdAndUpdate( photoId,{ $addToSet: {tags}, 
        isPublic: req.body.isPublic, 
        allowCommenting: req.body.allowCommenting, 
        title: req.body.title, 
        description: req.body.description,}
        ,{new:true}).populate({path: "tags"});
    res.status(200).send(updatedPhoto);
};

/**
 * A function that is used to Explore Photos by sorting them with most viewed.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.explorePhotos = async(req,res) => {
    const photos = await Photo.find({
        isPublic: true,
    }).sort({'views':-1}).populate({
        path:'creator'
    }).populate({
        path:'tags'
    });
    if(req.user){
        for(let i =0;i<photos.length;i++){
            req.user.favourites.forEach((id)=> {
                if(id.toString()=== photos[i].id.toString())
                    photos[i].isFavourite = true
            })
        }
    }
    res.send({photos});

}
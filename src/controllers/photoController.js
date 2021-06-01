const Photo = require('../model/photoModel');
const Album = require('../model/albumModel');
const Tag = require('../model/tagModel');
const Comment = require('../model/commentModel');

const { LogicError } = require('../error/logicError');
const { findByIdAndDelete } = require('../model/photoModel');

module.exports.uploadPhoto = async (req, res) => {
    reqBody = { ...req.body };
    delete reqBody['file'];
    const tags = reqBody['tags'].split(',');
    delete reqBody['tags'];
    const photo = new Photo({
        ...reqBody,
        url:
            process.env.HOSTNAME +
            req.file.path.toString().replaceAll('\\', '/'),
        creator: req.user._id,
    });
    const photoTags = [];
    for(var i =0; i< tags.length; i++){
        let tag = await Tag.findOne({name: tags[i] });
        if(!tag){
            tag = await Tag.create({ name: tags[i] , count :1});
            await tag.save();
        }else{
            await tag.updateOne({ $inc: { count: 1 } });
        }
        photoTags.push(tag)
    }
    photo.tags = photoTags
    photo.favouriteCount = 0;
    await photo.save();
    res.status(201).send({url:photo.url,_id:photo._id});
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
        user: userId,
        text: comment,
        photo: photoId,
    });
    await photo.updateOne({ $push: { comments: newComment } });
    res.status(200).json({
        message: 'Comment Added Successfully',
    });
};

module.exports.getMediaComments = async (req, res) => {
    const photo = await Photo.findById(req.body.photoId).populate('comments');
    if (!photo) {
        throw new LogicError(404, 'Photo Not Found');
    }
    const comments = photo.comments;
    res.status(200).json({
        comments,
    });
};


module.exports.deleteComment = async (req, res) => {
    const photoId = req.params.photoId;
    const userId = req.user._id;
    const commentId = req.body.commentId;
    const comment = await Comment.findById(commentId);
    const photo = await Photo.findById(photoId);
    if (!photo) {
        throw new LogicError(404, 'Photo Not Found');
    }
    if (!comment || photoId.toString() != comment.photo.toString()) {
        throw new LogicError(404, 'Comment Not Found');
    }
    if (comment.user._id.toString() != userId.toString()) {
        throw new LogicError(
            403,
            'You do not have permission to delete comments belonging to other users'
        );
    }
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
module.exports.getPhotoDetails = async (req, res) => {
    const photo = await Photo.findById(req.body.photoId).populate({
        path:'creator',
        select: '_id lastName firstName userName profilePhotoUrl coverPhotoUrl'
    }).populate({
        path: 'tags'
    })
    if (!photo) {
        throw new LogicError(404, 'Photo Not Found');
    }
    const user = req.user
    if(user){
        let isFollowing = false;
        user.following.forEach((id) => {
            
            if(id.toString() === photo.creator._id.toString())
                isFollowing = true
        });
        photo.creator.isFollowing = isFollowing
    }
    await photo.updateOne({
        $inc: { views: 1}
    });
    res.status(200).send(photo);
};
module.exports.editPhoto = async (req,res) =>{
    const photoId = req.params.photoId;
    const photo = await Photo.findById(photoId);
    const tags = [];
    if(!photo) throw new LogicError(404, 'Photo Not Found');
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
                console.log(tag);
                await tag.updateOne({ $inc: { count: 1 } });

            }
        }
        tags.push(tag)
    }
   const updatedPhoto = await Photo.findByIdAndUpdate( photoId,{ $addToSet: {tags}, 
        isPublic: req.body.isPublic, 
        allowCommenting: req.body.allowCommenting, 
        title: req.body.title, 
        description: req.body.description,}
        ,{new:true}).populate({path: "tags"});
    res.status(200).send(updatedPhoto);
};
module.exports.explorePhotos = async(req,res) => {
    const photos = await Photo.find({}).sort({'createdAt':-1}).populate({
        path:'creator'
    });
    res.send({photos});

}
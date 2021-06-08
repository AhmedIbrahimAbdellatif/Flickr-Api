/**
 * Tag Controller Module contains Tag's route handler
 * @module controlles/tag
 */

/**
 * Tag Model
 * @const
 */
const Tag = require('../model/tagModel');

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
 * A function that is used to Get Trending tags that has larger than 3 photos.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.getTrendingTags = async (req, res) => {
    const trendingTags = await Tag.find({ count: { $gte: 3 } }).sort({
        count: -1,
    });
    let photo;
    for (var i = 0; i < trendingTags.length; i++) {
        photo = await Photo.findOne({ tags: trendingTags[i]._id });
        trendingTags[i].photo = photo;
    }
    if(process.env.NODE_ENV != 'TEST')
        console.log(trendingTags);
    res.status(200).json({
        trendingTags,
    });
};
/**
 * A function that is used to Get Photos Belonging  to A certain Tag.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.getTagMedia = async (req, res) => {

    //Check if Tag exists
    const tagName = req.params.tagName;
    const tag = await Tag.findOne({ name: tagName }).populate({
        path:'photos',
        populate:[{
            path:'creator'
        },{
            path:'tags'
        },
        
    ]
    });
    if (!tag) {
        throw new LogicError(404, 'Tag Not Found');
    }

    //Populate loggedIn User isFavourite
    const media = tag.photos;
    if(req.user){

        for(let i =0;i<media.length;i++){
            req.user.favourites.forEach((id)=> {
                if(id.toString()=== media[i].id.toString())
                    media[i].isFavourite = true
            })
        }
    }
    res.status(200).json({
        media,
    });
};

/**
 * A function that is used to Search Tag.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.searchTags = async (req, res) => {
    const searchResult = await Tag.find({
        name: { $regex: '.*' + req.params.searchKeyword + '.*', $options: 'i' },
    }).sort({ name: -1 });
    res.status(200).send({
        searchResult,
    });
};

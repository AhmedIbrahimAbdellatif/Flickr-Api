const Tag = require('../model/tagModel');
const Photo = require('../model/photoModel');
const { LogicError } = require('../error/logic-error');

module.exports.getTrendingTags = async (req, res) => {
    const trendingTags = await Tag.find({ count: { $gte: 5 } }).sort({
        count: -1,
    });
    res.status(200).json({
        trendingTags,
    });
};

module.exports.getTagMedia = async (req, res) => {
    const tagName = req.params.tagName;
    const tag = await Tag.findOne({ name: tagName }).populate('photos');
    if(!tag){
        throw new LogicError(404,'Tag Not Found')
    }
    const media = tag.photos;
    console.log(media);
    res.status(200).json({
        media,
    });
};

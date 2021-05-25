const Tag = require('../model/tagModel');
const Photo = require('../model/photoModel');
const { LogicError } = require('../error/logic-error');

module.exports.getTrendingTags = async (req, res) => {
    const trendingTags = await Tag.find({ count: { $gte: 5 } }).sort({count: -1});
    res.status(200).json({
        trendingTags,
    });
};

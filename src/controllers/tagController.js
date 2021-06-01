const Tag = require('../model/tagModel');

module.exports.getTrendingTags = async (req, res) => {
    const trendingTags = await Tag.find({ count: { $gte: 5 } }).sort({count: -1});
    res.status(200).json({
        trendingTags,
    });
};

module.exports.searchTags = async (req, res) => {
    const searchResult = await Tag.find({ name: { $regex: ".*"+req.params.searchKeyword+".*", $options: 'i' } }).sort({name: -1});
    res.status(200).send({
        searchResult,
    });
};

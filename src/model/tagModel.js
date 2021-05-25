const mongoose = require('mongoose');
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    count: {
        type: Number,
        default: 0,
    },
});
//virtuals
tagSchema.virtual('photos', {
    ref: 'Photo',
    localField: '_id',
    foreignField: 'tags',
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;

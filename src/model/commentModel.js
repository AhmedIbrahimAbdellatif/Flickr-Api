const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        photo: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Photo',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);
commentSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'creator',
        select: 'userName',
    });
    next();
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

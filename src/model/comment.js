const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {
        type: String,
        unique: true,
        required: true,
    },
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment',commentSchema)

module.exports = Comment
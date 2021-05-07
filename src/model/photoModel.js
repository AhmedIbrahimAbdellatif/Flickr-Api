const mongoose = require('mongoose')
const photoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    tags: [{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Tag',
        default: []
    }],
    comments: [{
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Comment',
        default: []
    }],
    views: {
        type: Number,
        default: 0
    },
    favouriteCount: {
        type: Number,
        default: 0
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    license: {
        type: String,
        enum: ['None', 'Public Domain Work', 'Public Domain Dedication'],
        default: 'None'
    },
    safety: {
        type: String,
        enum: ['Safe', 'Moderate', 'Restricted'],
        default: 'Safe'
    },
    contentType: {
        type: String,
        enum: ['Screenshot', 'Art/Illustration', 'Photo'],
        required: true
    },
    creator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    allowCommenting: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})
//virtuals
photoSchema.virtual('favoured', {
    ref: 'User',
    localField: '_id',
    foreignField: 'favourites'
})
const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo
const mongoose = require('mongoose');
const albumSchema = new mongoose.Schema(
    {
        featured: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Photo',
                default: [],
            },
        ],
        creator: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        views: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);
//virtuals
albumSchema.virtual('photos', {
    ref: 'Photo',
    localField: 'photos',
    foreignField: '_id',
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;

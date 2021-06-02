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
  photo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Photo'
  }
}, {
    timestamps: true
})

    

//virtuals
tagSchema.virtual('photos', {
    ref: 'Photo',
    localField: '_id',
    foreignField: 'tags',
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;

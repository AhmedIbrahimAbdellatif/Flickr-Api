const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: [true, 'Please Email'],
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        showCase: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Photo',
                default: [],
            },
        ],
        favourites: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Photo',
                default: [],
            },
        ],
        following: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'User',
                default: [],
            },
        ],
        description: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);
//virtuals
userSchema.virtual('followers', {
    ref: 'User',
    localField: '_id',
    foreignField: 'following',
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.correctPassword = async function (
    passwordToBeChecked,
    originalPassword
) {
    return await bcrypt.compare(passwordToBeChecked, originalPassword);
};
const User = mongoose.model('User', userSchema);

module.exports = User;

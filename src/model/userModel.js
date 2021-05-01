const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
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
        passwordChangedAt: {
            //At implementation of Change Password Please set this to the current date
            type: Date, //YYYY/MM/DD
            select: false,
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
userSchema.methods.signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
userSchema.methods.changedPassword = function (JWTTimeStamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
};
const User = mongoose.model('User', userSchema);

module.exports = User;

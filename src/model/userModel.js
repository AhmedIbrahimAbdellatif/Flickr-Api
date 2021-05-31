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
        userName: {
            type: String,
        },
        age: {
            type: Number,
            required: true,
        },
        showCase: {
            
            _id:false,
            title:{
                type:String,
                default: 'Showcase'
            },
            photos: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Photo',
                default: [],
            },
        ]},
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
        forgetPassCode: {
            type: String,
            select: false,
        },
        occupation: {
            type: String,
            default: '',
        },
        homeTown: {
            type: String,
            default: '',
        },
        currentCity: {
            type: String,
            default: '',
        },
        facebookId:{
            type:String,
            select: false
        },
        coverPhotoUrl:{
            type: String,
            default: process.env.HOSTNAME + "public/images/default/8.jpeg"
        }
    },
    {
        timestamps: true,
        toJSON: {
            transform: function(doc,ret,options){
                
                if(!ret.numberOfFollowers)
                    ret.numberOfFollowers = 0;
                ret.numberOfFollowings = ret.following.length;
                delete ret.following;
                delete ret.facebookId;
                delete ret.favourites;
                delete ret.password;
            },
            virtuals:true
        },
        toObject: {
            virtuals: true
        }
    }
);
//virtuals
userSchema.virtual('followers', {
    ref: 'User',
    localField: '_id',
    foreignField: 'following',
});
userSchema.virtual('numberOfFollowers', {
    ref: 'User',
    localField: '_id',
    foreignField: 'following',
    count: true
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

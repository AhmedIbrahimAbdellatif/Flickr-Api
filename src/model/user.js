const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    firstName: {
        type:String,
        required: true
    }, 
    lastName: {
        type:String,
        required: true
    },
    age:{
        type:Number,
        required: true,
    } ,
    showCase: [{

        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Photo',
        default:[]
    }],
    favourites: [{

        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Photo',
        default:[]
    }],
    following: [{

        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        default:[]
    }],
    description: {
        type: String,
        default :''
    }
},{
    timestamps: true
})
//virtuals
userSchema.virtual('followers',{
    ref: 'User',
    localField: '_id',
    foreignField: 'following'
})
const User = mongoose.model('User',userSchema)

module.exports = User
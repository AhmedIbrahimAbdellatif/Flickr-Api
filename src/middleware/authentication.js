const User = require('../model/user');

// This is just a mock added by Ahmed Ibrahim to simulate the behavior of this middleware
// It's Ghallab's task so he will replace it with the implementation
const auth = async (req, res, next) => {
    req.user = await User.findById('5349b4ddd2781d08c09890f4');
    // req.user = new User({
    //     email: 'test@gmail.com',
    //     password: '123',
    //     firstName: 'test',
    //     lastName: 'test',
    //     age: '18',
    //     favourites: ["608721aff453eb230cc86382"],
    //     _id: '5349b4ddd2781d08c09890f4'
    // })
    next();
};

module.exports = auth;

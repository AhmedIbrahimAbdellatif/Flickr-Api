const User = require('../model/userModel');
const { LogicError } = require('../error/logic-error');
const { setAsync, getAsync } = require('../third-Parties/redis');
const { sendResetPasswordEmail } = require('../third-Parties/email');
const { getFacebookData } = require('../third-Parties/facebook');
const crypto = require('crypto')

module.exports.signUp = async (req, res, next) => {
    const { email, password, firstName, lastName, age } = req.body;
    if (await User.findOne({ email })) {
        throw new LogicError(403, 'User Already Exists');
    }
    const userName = email.split('@')[0];
    const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
        userName,
        age,
    });
    const token = newUser.signToken(newUser._id);
    res.status(201).json({
        accessToken: token,
        user:newUser
    });
};

module.exports.signUpWithFacebook = async (req, res, next) => {
    const { accessToken } = req.body;
    const userData = await getFacebookData(accessToken);

    let user = await User.findOne({ email: userData.email })
    if (user) {
        user.facebookId = userData.id;
        await user.save();
        await user.populate({
            path: 'numberOfFollowers'
        }).populate({
            path: 'showCase.photos'
        }).execPopulate();
        const token = user.signToken(user._id);
        res.status(201).json({
            accessToken: token,
            user
        });
        return;
    }else{
        const userName = userData.email.split('@')[0];
        const password = await await crypto.randomBytes(11).toString('hex');
        const user = await User.create({
            email:userData.email,
            password,
            firstName: userData.first_name,
            lastName: userData.last_name,
            userName,
            age: userData.age,
            facebookId: userData.id
        });
        const token = user.signToken(user._id);
        res.status(201).json({
            accessToken: token,
            user
        });
    }
};
module.exports.loginnWithFacebook = async (req, res, next) => {
    const { accessToken } = req.body;
    const userData = await getFacebookData(accessToken);
    let user = await (await User.findOne({ facebookId: userData.id })).populate('numberOfFollowers').populate({
        path: 'showCase.photos'
    }).execPopulate();
    if (!user) 
        throw new LogicError(404,"User Not Found");
    
    const token = user.signToken(user._id);
    res.status(200).json({
        accessToken: token,
        user
    });
    
};

module.exports.logIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await (await User.findOne({ email }).select('+password').populate('numberOfFollowers')).populate({
        path: 'showCase.photos'
    }).execPopulate();
    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new LogicError(401, 'Invalid Credentials');
    }
    const token = user.signToken(user._id);
    res.status(200).json({
        accessToken: token,
        user
    });
};

module.exports.logOut = async (req, res, next) => {
    const token = req.token;
    const setReturns = await setAsync(
        token,
        'LoggedOut',
        'EX',
        process.env.REDIS_CLEAR_TIME
    );
    res.status(200).json({
        message: 'You are logged out successfuly',
    });
};

module.exports.changePassword = async (req, res) => {
    const user = req.user;
    const userPass = await User.findById(user._id).select('+password');
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    const isCorrect = await userPass.correctPassword(
        oldPass,
        userPass.password
    );
    if (!isCorrect) throw new LogicError(400, 'Old password is incorrect');
    userPass.password = newPass;

    //Setting the required format for the date
    const dateObj = new Date(Date.now());

    userPass.passwordChangedAt = dateObj;
    console.log({ ...userPass });
    await userPass.save();
    res.send();
};

module.exports.forgetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({
        email,
    });

    if (!user) throw new LogicError(404, 'User not found');

    user.forgetPassCode = await sendResetPasswordEmail(email);
    await user.save();
    res.send({});
};

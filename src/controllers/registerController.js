/**
 * Register Controller Module contains Register's route handler
 * @module controlles/register
 */

/**
 * User Model
 * @const
 */
const User = require('../model/userModel');

/**
 * LogicError Class used to throw logical error in route handlers
 * @const
 */
const { LogicError } = require('../error/logicError');

/**
 * two functions to set and retireve data from redis
 * @function
 */
const { setAsync, getAsync } = require('../third-Parties/redis');

/**
 * A Function to send resetPasswrod email
 * @function
 */
const { sendResetPasswordEmail } = require('../third-Parties/email');

/**
 * Functin to get FaceBook Data
 * @const
 */
const { getFacebookData } = require('../third-Parties/facebook');

/**
 * Crypto Module
 * @const
 */
const crypto = require('crypto')

/**
 * A function that is used to SignUp a new User.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.signUp = async (req, res, next) => {

    //Chec if email already exists
    const { email, password, firstName, lastName, age } = req.body;
    if (await User.findOne({ email })) {
        throw new LogicError(403, 'User Already Exists');
    }

    //Create new User
    const userName = email.split('@')[0];
    const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
        userName,
        age,
    });

    //Create New token
    const token = newUser.signToken(newUser._id);
    await newUser.populate({
        path:'numberOfPhotos'
    }).execPopulate();
    res.status(201).json({
        accessToken: token,
        user:newUser
    });
};

/**
 * A function that is used to SignUpWithFacebook.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.signUpWithFacebook = async (req, res, next) => {

    //Check if email already exists if it does link  it to the facbook account
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

        //Create New Access Token
        const token = user.signToken(user._id);
        res.status(201).json({
            accessToken: token,
            user
        });
        return;
    }else{
        //If no user was found create new User
        const userName = userData.email.split('@')[0];
        const password = await  crypto.randomBytes(11).toString('hex');
        const user = await User.create({
            email:userData.email,
            password,
            firstName: userData.first_name,
            lastName: userData.last_name,
            userName,
            age: userData.age,
            facebookId: userData.id
        });

        //Create New Access Token
        const token = user.signToken(user._id);
        await user.populate({
            path:'numberOfPhotos'
        }).execPopulate();
        res.status(201).json({
            accessToken: token,
            user
        });
    }
};


module.exports.loginnWithFacebook = async (req, res, next) => {
    const { accessToken } = req.body;
    const userData = await getFacebookData(accessToken);
    let user = await User.findOne({ facebookId: userData.id })
    if (!user) 
        throw new LogicError(404,"User Not Found");
    await user.populate('numberOfFollowers').populate({
        path: 'showCase.photos'
    }).populate({
        path:'numberOfPhotos'
    }).execPopulate();
    const token = user.signToken(user._id);
    res.status(200).json({
        accessToken: token,
        user
    });
    
};

/**
 * A function that is used to logInWithFacebook.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.logIn = async (req, res, next) => {
    const { email, password } = req.body;

    //Check that email exists
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new LogicError(401, 'Invalid Credentials');
    }
    await user.populate('numberOfFollowers').populate({
        path: 'showCase.photos'
    }).populate({
        path:'numberOfPhotos'
    }).execPopulate();

    //Create new Access token
    const token = user.signToken(user._id);
    res.status(200).json({
        accessToken: token,
        user
    });
};

/**
 * A function that is used to logOut User.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.logOut = async (req, res, next) => {

    //Get Access Token and blacklist it
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

/**
 * A function that is used to Change Password.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.changePassword = async (req, res) => {
    const user = req.user;

    //Get loggedIn User and check if oldPassword is the same as Saved One
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
    await userPass.save();
    res.send();
};

/**
 * A function that is used to Handle Forgeting Password.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.forgetPassword = async (req, res) => {

    //Check If User exists
    const { email } = req.body;
    const user = await User.findOne({
        email,
    });
    if (!user) throw new LogicError(404, 'User not found');

    //Send mail and generate Code to use in reset Passwords
    user.forgetPassCode = await sendResetPasswordEmail(email);
    await user.save();
    res.send({});
};

/**
 * A function that is used to Reset User's Password Using Code and Email.
 * @param {Object} req - The request passed.
 * @param {Object} res - The respond sent
 * @function
 */
module.exports.resetPassword = async (req, res) => {

    //Check if Email exists
    const { email,code ,newPass } = req.body;
    const user = await User.findOne({
        email,
    }).select('+forgetPassCode +password');
    if (!user) throw new LogicError(404, 'User not found');

    //Check that user has a code and equals the onew provided
    if(!user.forgetPassCode || user.forgetPassCode !== code) throw new LogicError(400, 'Code is Invalid');

    //Change the User's Password
    user.forgetPassCode = undefined;
    user.password = newPass
    await user.save();
    res.send({});
};
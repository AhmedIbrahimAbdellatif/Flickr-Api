const User = require('../model/userModel');
const { LogicError } = require('../error/logic-error');
const { setAsync, getAsync } = require('../third-Parties/redis');
module.exports.signUp = async (req, res, next) => {
    const { email, password, firstName, lastName, age } = req.body;
    if (await User.findOne({ email })) {
        throw new LogicError(403, 'User Already Exists');
    }
    const newUser = await User.create({
        email,
        password,
        firstName,
        lastName,
        age,
    });
    const token = newUser.signToken(newUser._id);
    res.status(201).json({
        accessToken: token,
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        age: newUser.age,
    });
};

module.exports.logIn = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
        throw new LogicError(401, 'Invalid Credentials');
    }
    const token = user.signToken(user._id);
    res.status(200).json({
        accessToken: token,
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

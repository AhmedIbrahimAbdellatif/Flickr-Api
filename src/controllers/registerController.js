const User = require('../model/userModel');
const { LogicError } = require('../error/logic-error');
const { setAsync, getAsync } = require('../third-Parties/redis');
const { sendResetPasswordEmail } = require('../third-Parties/email')

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

module.exports.changePassword = async (req, res) => {
    const user = req.user;
    const userPass = await User.findById(user._id).select('+password');
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    const isCorrect = await userPass.correctPassword(oldPass, userPass.password);
    if(!isCorrect) throw new LogicError(400, 'Old password is incorrect');
    userPass.password = newPass;
    
    //Setting the required format for the date
    const dateObj = new Date(Date.now());
    
    userPass.passwordChangedAt = dateObj;
    console.log({...userPass})
    await userPass.save()
    res.send();
};

module.exports.forgetPassword = async (req,res) => {

    const { email } = req.body
    const user = await User.findOne({
        email
    });

    if(!user) throw new LogicError(404,'User not found')

    user.forgetPassCode =  await sendResetPasswordEmail(email)
    await user.save()
    res.send({})
}
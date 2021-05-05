const User = require('../model/userModel');
const { LogicError } = require('../error/logic-error');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { redisClient, getAsync, setAsync } = require('../third-Parties/redis');

const auth = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
        req.token = token;
    }
    if (!token) {
        throw new LogicError(
            401,
            'You are not logged in! Please log in to continue'
        );
    }
    let decoded;
    try {
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new LogicError(
            401,
            'Token may be Invalid or Expired! Please log in to continue'
        );
    }
    const redisValue = await getAsync(token);
    if (redisValue == 'LoggedOut') {
        throw new LogicError(
            401,
            'This user is logged out! Please log in to continue'
        );
    }
    const user = await User.findById(decoded.id);
    if (!user) {
        throw new LogicError(
            401,
            'The user that belongs to this token does not exist'
        );
    }
    if (user.changedPassword(decoded.iat)) {
        throw new LogicError(
            401,
            'The user that belongs to this token changed his password recently! Please reLogin'
        );
    }
    req.user = user;
    next();
};

module.exports = auth;

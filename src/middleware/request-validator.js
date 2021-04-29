const { validationResult, body } = require('express-validator');
const { RequestValidationError } = require('../error/request-validation');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    next();
};

const validatePhotoId = [
    body('photoId').isMongoId().withMessage('Photo Id is missing'),
];
const validateSignUp = [
    body('email').isEmail().withMessage('Email is required'),
    body('password')
        .isString()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be more than 8 characters'),
    body('firstName').isString().withMessage('First Name is required'),
    body('lastName').isString().withMessage('Last Name is required'),
    body('age').isNumeric().withMessage('Age is required'),
];
const validateLogIn = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isString().withMessage('Password is required'),
];
module.exports = {
    validateRequest,
    validatePhotoId,
    validateSignUp,
    validateLogIn,
};

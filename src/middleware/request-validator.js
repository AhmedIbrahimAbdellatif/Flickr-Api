const { validationResult, body, param } = require('express-validator');
const { RequestValidationError } = require('../error/request-validation');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
    next();
};


//Body Validations
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
const validatePhotoUpload = [
    body('photo').withMessage('File is required'),
    body('title').isString().withMessage('Title is required'),
    body('contentType').isString().withMessage('Content Type is required'),
    body('isPublic').optional().isBoolean().withMessage('Is Public should be boolean'),
    body('allowCommenting').optional().isBoolean().withMessage('Allow Commenting should be boolean'),
    body('license').optional().isString().withMessage('license should be string'),
    body('description').optional().isString().withMessage('Description should be string'),
    body('safetyOption').optional().isString().withMessage('Safety Option should be string'),
 
]
//Params Validations
const validatePhotoIdParam = [
    param('photoId').isMongoId().withMessage('PhotoId is required')
]
module.exports = {
    validateRequest,
    validatePhotoId,
    validateSignUp,
    validateLogIn,
    validatePhotoIdParam
};

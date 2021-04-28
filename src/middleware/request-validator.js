const { validationResult, body } = require('express-validator');
const { RequestValidationError } = require( '../error/request-validation') ;

const validateRequest = (
  req,
  res,
  next
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
  next();
}

const validatePhotoId = [
    body('photoId').isMongoId().withMessage('Photo Id is missing')
]
const validateSignUp = [
  body('email').isEmail().withMessage('Email is missing'),
  body('password').isString().withMessage('Password is missing')
]
module.exports = {
    validateRequest,
    validatePhotoId,
    validateSignUp
}
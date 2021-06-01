const { CustomError } = require('./customError')

class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(errors){
        super('Request Validation Error')
        this.errors = errors
        Object.setPrototypeOf(this, RequestValidationError.prototype);

    }
    serializeError() {
        return {
          message: this.errors[0].msg,
        };
      }
}
module.exports = {
    RequestValidationError
}
const { CustomError } = require('./customError')

class LogicError extends CustomError {
   
    constructor(statusCode, message){
        super(message)
        this.statusCode = statusCode
        this.message = message
        Object.setPrototypeOf(this, LogicError.prototype);

    }
    serializeError() {
        return {
          message: this.message,
        };
      }
}
module.exports = {
    LogicError
}
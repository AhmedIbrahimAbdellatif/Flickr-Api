const { CustomError } = require('./custom-error')

class NotFound extends CustomError {
    statusCode = 404;
    constructor(){
        super('Route Not Found')
        Object.setPrototypeOf(this, NotFound.prototype);

    }
    serializeError() {
        return {
          message: 'Not Found',
        };
      }
}
module.exports = {
    NotFound
}
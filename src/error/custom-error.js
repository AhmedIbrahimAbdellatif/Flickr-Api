class CustomError extends Error {
    statusCode;
    constructor(message){
      super(message)
      
      Object.setPrototypeOf(this, CustomError.prototype);
    }
    seralizeError(){}
}
module.exports = {
    CustomError
}
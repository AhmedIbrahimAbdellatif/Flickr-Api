const { CustomError } = require('../error/customError')

const errorHandler = (
  error,
  req,
  res,
  next
) => {
  if(process.env.NODE_ENV != 'TEST')
    console.log(error);
  if (error instanceof CustomError)
    res.status(error.statusCode).send(error.serializeError());
  else
    res.status(400).send({
        message: 'Something went wrong',
    });
};

module.exports = {
    errorHandler
}
import { StatusCodes } from 'http-status-codes'
const errorHandlerMiddleware = (err, req, res, next) => {
  const error = {
    code: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || `Something went wrong Please try again later..`,
  }

  if (err.name === 'ValidationError') {
    error.code = StatusCodes.BAD_REQUEST
    error.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(',')
  }

  if (err.code && err.code === 11000) {
    error.code = StatusCodes.BAD_REQUEST
    error.message = `${Object.keys(err.keyValue)} field has to be unique`
  }
  res.status(error.code).json({ message: error.message })
}

export default errorHandlerMiddleware

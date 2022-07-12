const { StatusCodes } = require('http-status-codes');
const errorMessages = require('../../helpers/errorMessages');

const error = (err, req, res, _next) => {
  console.log(err);
  if (err.message) {
    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: errorMessages.internalServerError });
};

module.exports = error;
const { StatusCodes } = require('http-status-codes');

const generateError = require('../../helpers/generateError');
const emailPattern = require('../../helpers/emailPattern');
const errorMessages = require('../../helpers/errorMessages');

const middleware = {};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    throw generateError({
      status: StatusCodes.BAD_REQUEST,
      message: errorMessages.allFields,
    });
  }

  if (!emailPattern.test(email)) {
    throw generateError({
      status: StatusCodes.BAD_REQUEST,
      message: errorMessages.emailFormat,
    });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    throw generateError({
      status: StatusCodes.BAD_REQUEST,
      message: errorMessages.allFields,
    });
  }

  if (password.length < 6) {
    throw generateError({
      status: StatusCodes.BAD_REQUEST,
      message: errorMessages.passwordLength,
    });
  }

  next();
};

middleware.create = [validateEmail, validatePassword];
module.exports = middleware;

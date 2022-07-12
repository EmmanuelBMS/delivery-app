const { StatusCodes } = require('http-status-codes');

const errorMessages = require('../../helpers/errorMessages');
const emailPattern = require('../../helpers/emailPattern');
const generateError = require('../../helpers/generateError');

const middleware = {};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email || typeof email !== 'string') {
    throw generateError({ status: StatusCodes.BAD_REQUEST, message: errorMessages.allFields });
  }

  if (!emailPattern.test(email)) {
    throw generateError({ status: StatusCodes.BAD_REQUEST, message: errorMessages.allFields });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || typeof password !== 'string') {
    throw generateError({ status: StatusCodes.BAD_REQUEST, message: errorMessages.allFields });
  }

  if (password.length < 6) {
    throw generateError({ status: StatusCodes.BAD_REQUEST, message: errorMessages.passwordLength });
  }

  next();
};

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    throw generateError({ status: StatusCodes.BAD_REQUEST, message: errorMessages.allFields });
  }

  if (name.length < 3) {
    throw generateError({ status: StatusCodes.BAD_REQUEST, message: errorMessages.allFields });
  }
  next();
};

const validateRole = (req, res, next) => {
  const { role } = req.body;

  if (!role || typeof role !== 'string') {
    throw generateError({ status: StatusCodes.BAD_REQUEST, message: errorMessages.allFields });
  }

  next();
};

const validateRole2 = (req, res, next) => {
  const { role } = req.body;

  if (role !== 'administrator' && role !== 'seller' && role !== 'customer') {
    throw generateError({ status: StatusCodes.BAD_REQUEST, message: errorMessages.roleInvalid });
  }

  next();
};

middleware.create = [validateEmail, validateName, validatePassword, validateRole, validateRole2];

module.exports = middleware;
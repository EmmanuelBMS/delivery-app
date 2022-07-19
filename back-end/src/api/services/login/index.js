const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');

const { User } = require('../../../database/models');
const { generate, verificateToken } = require('../../../helpers/tokenAuth');
const generateError = require('../../../helpers/generateError');
const errorMessages = require('../../../helpers/errorMessages');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email }, raw: true });
  const passCrypto = crypto.createHash('md5').update(password).digest('hex');

  if (!user || passCrypto !== user.password) {
    throw generateError({
      status: StatusCodes.NOT_FOUND,
      message: errorMessages.incorrectFields,
    });
  }
  delete user.password;
  const token = generate(user);

  return { ...user, token };
};

const userValidate = (token) => {
  const user = verificateToken(token);
  if (!user || user.JsonWebTokenError) {
    throw generateError({
      status: StatusCodes.UNAUTHORIZED,
      message: errorMessages.tokenInvalid,
    });
  }
  return user;
};

module.exports = {
  login,
  userValidate,
};
const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');

const { User } = require('../../../database/models');
const { generate } = require('../../../helpers/tokenAuth');
const generateError = require('../../../helpers/generateError');
const errorMessages = require('../../../helpers/errorMessages');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email }, raw: true });
  const passCrypto = crypto.createHash('md5').update(password).digest('hex');

  if (!user || passCrypto !== user.password) {
    throw generateError({
      status: StatusCodes.BAD_REQUEST,
      message: errorMessages.incorrectFields,
    });
  }
  console.log(user);

  delete user.password;
  delete user.id;
  const token = generate(user);

  return { ...user, token };
};

module.exports = {
  login,
};
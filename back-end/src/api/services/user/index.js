const crypto = require('crypto');
const { User } = require('../../../database/models');
const user = require('../../../database/models/user');
const generateError = require('../../../helpers/generateErro');
const { generate } = require('../../../helpers/tokenAuth');

const findOne = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (user) {
    throw generateError({ status: 404, message: 'Email already exist' });
  }
  return user;
};

const create = async (newUser) => {
  await findOne(newUser.email);
  const passCrypto = crypto.createHash('md5').update(newUser.password).digest('hex');
  newUser.password = passCrypto;
  const { dataValues: userCreated } = await User.create(newUser);
  delete userCreated.password;
  const token = generate(userCreated);
  return { token };
};

module.exports = {
  create,
  findOne,
};
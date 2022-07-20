const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');

const { User } = require('../../../database/models');
const errorMessages = require('../../../helpers/errorMessages');
const generateError = require('../../../helpers/generateError');
const { generate } = require('../../../helpers/tokenAuth');

const findOne = async (email, name) => {
  const user = await User.findOne({ where: { [Op.or]: [{ name }, { email }] } });

  if (user) {
    throw generateError({
      status: StatusCodes.CONFLICT,
      message: errorMessages.userExist,
    });
  }

  return user;
};

const findAll = async () => {
  const user = await User.findAll({ where: { role: 'seller' } });
  return user;
};

const create = async (newUser) => {
  await findOne(newUser.email, newUser.name);

  const passCrypto = crypto.createHash('md5').update(newUser.password).digest('hex');
  const objUser = newUser;
  objUser.password = passCrypto;

  const { dataValues: userCreated } = await User.create(objUser);
  delete userCreated.password;
  const token = generate(userCreated);

  return { ...userCreated, token };
};

module.exports = {
  create,
  findOne,
  findAll,
};

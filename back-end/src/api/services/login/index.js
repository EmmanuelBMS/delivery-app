const crypto = require('crypto');
const { User } = require("../../../database/models");
const user = require("../../../database/models/user");
const generateError = require("../../../helpers/generateErro");
const { generate } = require("../../../helpers/tokenAuth");

const login = async (email, password) => {
  const user = await User.findOne({ where: { email }, raw: true });
  const passCrypto = crypto.createHash('md5').update(password).digest("hex");
  if(!user || passCrypto !== user.password) {
    throw generateError({ status: 401, message: 'Incorrect email or password'});
  }
  console.log(user);
  delete user.password
  const token = generate(user)
  return { user, token };
}

module.exports = {
  login
}
const { StatusCodes } = require('http-status-codes');
const loginService = require('../../services/login');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginService.login(email, password);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const userValidate = async (req, res, next) => {
  try {
    const { token } = req.body;
    const result = loginService.userValidate(token);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  userValidate,
};
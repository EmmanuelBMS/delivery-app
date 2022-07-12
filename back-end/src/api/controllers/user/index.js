const { StatusCodes } = require('http-status-codes');

const userService = require('../../services/user');

const create = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await userService.create({ name, email, password, role });

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
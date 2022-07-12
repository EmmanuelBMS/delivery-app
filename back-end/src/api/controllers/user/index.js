const userService = require('../../services/user');

const create = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await userService.create({ name, email, password, role });
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};
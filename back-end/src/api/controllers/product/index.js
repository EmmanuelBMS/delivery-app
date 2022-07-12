const { StatusCodes } = require('http-status-codes');
const ProductService = require('../../services/product');

const findAll = async (_req, res, next) => {
  try {
    const result = await ProductService.findAll();

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await ProductService.findById(id);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findById,
};
const { StatusCodes } = require('http-status-codes');
const saleService = require('../../services/sale');

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await saleService.findByIdSale(id);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const findAllByIdSales = async (req, res, next) => {
  try {
    const { id, role } = req.query;
    const result = await saleService.findAllByIdSales(id, role);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
  const { sale, product } = req.body;
    const result = await saleService.create({ sale, product });

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
  const { id } = req.params;
  const { status } = req.body;
    const result = await saleService.updateSale(id, status);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findById,
  create,
  findAllByIdSales,
  update,
};

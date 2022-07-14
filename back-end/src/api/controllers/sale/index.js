const { StatusCodes } = require('http-status-codes');
const saleService = require('../../services/sale');

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await saleService.findById(id);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status } = req.body;
   await saleService.create({
     userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status,
    });
    return res.status(StatusCodes.CREATED).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findById,
  create,
};
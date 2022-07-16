const StatusCodes = require('http-status-codes');

const { Product } = require('../../../database/models');
const generateError = require('../../../helpers/generateError');
const errorMessages = require('../../../helpers/errorMessages');

const findAll = async () => {
  const products = await Product.findAll({ raw: true });
  return products;
};

const findById = async (id) => {
  const product = await Product.findOne({ where: { id } });

  if (!product) {
    throw generateError({
      status: StatusCodes.NOT_FOUND,
      message: errorMessages.productNotFound,
    });
  }

  return product;
};

module.exports = {
  findAll,
  findById,
};
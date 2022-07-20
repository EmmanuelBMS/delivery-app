const { StatusCodes } = require('http-status-codes');
const { Sale, User, SaleProduct, sequelize, Product } = require('../../../database/models');
const generateError = require('../../../helpers/generateError');

const create = async (newSale) => {
  const { sale, product } = newSale;
  let result;

  await sequelize.transaction(async (t) => {
    const { dataValues } = await Sale.create(sale, { transaction: t });

    const saleProducts = product.map((prod) => {
      const { productId, quantity } = prod;
      const saleProduct = { saleId: dataValues.id, productId, quantity };

      return SaleProduct.create(saleProduct, { transaction: t });
    });

    await Promise.all(saleProducts);

    result = dataValues.id;
  });

  return result;
};

const updateSale = async (id, status) => {
  const sale = await Sale.findOne({ where: { id } });
  if (!sale) {
    throw generateError({
      status: StatusCodes.NOT_FOUND,
      message: 'Sale not found',
    });
  }
  await Sale.update({ status }, { where: { id } });
};

const findByIdSale = async (id) => {
  const sale = Sale.findOne({
    where: { id },
    include: [
      { model: Product, as: 'products' },
      { model: User, as: 'seller' },
    ],
  });

  if (!sale) {
    throw generateError({
      status: StatusCodes.NOT_FOUND,
      message: 'Sale not found',
    });
  }

  return sale;
};

const findAllByIdSales = async (id, role) => {
  if (role === 'customer') {
    return Sale.findAll({
      where: { userId: id },
      include: [
        { model: Product, as: 'products' },
        { model: Sale, as: 'seller' },
      ],
    });
  }

  return Sale.findAll({
    where: { sellerId: id },
    include: [
      { model: Product, as: 'products' },
    ],
  });
};

module.exports = { create, findByIdSale, findAllByIdSales, updateSale };

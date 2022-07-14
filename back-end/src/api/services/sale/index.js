const { Sale } = require('../../../database/models');

const findById = async (userId) => {
  const sales = Sale.findAll({ where: { userId } });
  return sales;
};

const create = async (newSale) => {
  await Sale.create(newSale);
};

module.exports = { create, findById };
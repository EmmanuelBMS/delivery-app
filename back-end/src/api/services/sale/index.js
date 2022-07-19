const { Sale, SaleProduct, sequelize, Product } = require('../../../database/models');

const create = async (newSale) => {
  const { sale, product } = newSale;

  await sequelize.transaction(async (t) => {
    const { dataValues } = await Sale.create(sale, { transaction: t });

    const saleProducts = product.map((prod) => {
      const { productId, quantity } = prod;
      const saleProduct = { saleId: dataValues.id, productId, quantity };

      return SaleProduct.create(saleProduct, { transaction: t });
    });

    await Promise.all(saleProducts);
    return dataValues.id
  });
};

const findByIdSale = async (id) => {
  const sales = Sale.findOne({
    where: { id },
    include: [
      { model: Product, as: 'products' },
    ],
  });

  return sales;
};

const findAllByIdSales = async (id, role) => {
  if (role === 'customer') {
    return Sale.findAll({
      where: { userId: id },
      include: [
        { model: SaleProduct, as: 'products' },
      ],
    });
  }

  return Sale.findAll({
    where: { saleId: id },
    include: [
      { model: SaleProduct, as: 'products' },
    ],
  });
};

module.exports = { create, findByIdSale, findAllByIdSales };

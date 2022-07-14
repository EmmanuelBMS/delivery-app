module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    quantity: DataTypes.INTEGER,
  }, { timestamps: false, tableName: 'salesProducts'});

  SaleProduct.associate = (models) => {
    SaleProduct.belongsToMany(models.Sale,
      { foreignKey: 'sale_id', as: 'sales' });
  };

  SaleProduct.associate = (models) => {
    SaleProduct.belongsToMany(models.Product,
      { foreignKey: 'product_id', as: 'products' });
  };

  return User;
};

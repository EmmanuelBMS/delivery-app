module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    "SaleProduct",
    {
      saleId: { type: DataTypes.INTEGER, foreignKey: true },
      productId: { type: DataTypes.INTEGER, foreignKey: true },
      quantity: DataTypes.INTEGER
    },
    { timestamps: false, tableName: "salesProducts", underscored: true }
  );

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: "sales",
      through: SaleProduct,
      foreignKey: "productId",
      otherKey: "saleId",
    });
  };

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      as: "products",
      through: SaleProduct,
      foreignKey: "saleId",
      otherKey: "productId",
    });
  };

  return SaleProduct;
};

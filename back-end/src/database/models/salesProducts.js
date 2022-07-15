module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    "SaleProduct",
    {
      quantity: DataTypes.INTEGER,
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER
    },
    { timestamps: false, tableName: "salesProducts", underscored: true }
  );

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      foreignKey: "saleId",
      as: "sales",
      through: "SaleProduct",
    });
  };

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(models.Product, {
      foreignKey: "productId",
      as: "products",
      through: "SaleProduct",
    });
  };

  return SaleProduct;
};

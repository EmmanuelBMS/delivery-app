module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: DataTypes.INTEGER,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: {type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: DataTypes.STRING,
  }, { timestamps: false, tableName: 'sales', underscored: true });

  Sale.associate = (models) => {
    Sale.hasMany(models.SaleProduct,
      { foreignKey: 'sale_id', as: 'sales' });
  };

  Sale.associate = (models) => {
    Sale.belongsToMany(models.User,
      { foreignKey: 'user_id', as: 'user' });
  };
  return User;
};
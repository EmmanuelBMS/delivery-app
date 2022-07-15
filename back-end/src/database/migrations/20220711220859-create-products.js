'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productsTable =  await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(4,2),
        allowNull: false,
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    })
    return productsTable
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable("products");
  }
}

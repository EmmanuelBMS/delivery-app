'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     const salesProducts = await queryInterface.createTable('salesProducts', {
      sale_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         onUpdate: 'CASCADE',
         onDelete: 'CASCADE',
         references: {
           model: "sales",
           key:"id"
         }
        },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "products",
          key:"id"
        }
       },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
      return salesProducts
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('salesProducts');
  }
};

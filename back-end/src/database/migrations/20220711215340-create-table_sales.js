'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salesTable =  await queryInterface.createTable("sales", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "users",
          key: "id"
        }
      },
      seller_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: "users",
          key: "id"
        }
      },
      total_price: {
        allowNull: false,
        type: Sequelize.DECIMAL(9,2),
      },
      delivery_address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      delivery_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sale_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sale_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
    return salesTable
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable("sales");
  }
}

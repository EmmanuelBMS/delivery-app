'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usersTable =  await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
    return usersTable
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.dropTable("users");
  }
}
const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('sessions', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
    await queryInterface.addColumn('sessions', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('sessions', 'created_at');
    await queryInterface.removeColumn('sessions', 'updated_at');
  },
};

const { DataTypes, Sequelize } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blog_reading_lists', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
    await queryInterface.addColumn('blog_reading_lists', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blog_reading_lists', 'created_at');
    await queryInterface.removeColumn('blog_reading_lists', 'updated_at');
  },
};

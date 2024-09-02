const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('blog_reading_lists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      blog_id: {
        type: DataTypes.INTEGER,
        references: { model: 'blogs', key: 'id' },
        onDelete: 'CASCADE',
      },
      reading_list_id: {
        type: DataTypes.INTEGER,
        references: { model: 'reading_lists', key: 'id' },
        onDelete: 'CASCADE',
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blog_reading_lists');
  },
};

const { DataTypes } = require('sequelize')
const Sequelize = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('blogs', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          author: {
            type: DataTypes.TEXT
          },
          url: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          title: {
            type: DataTypes.TEXT,
            allowNull: false
          },
          likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0 
          },
          year: {
            type: DataTypes.INTEGER,
            validate: {
              isInt: { msg: 'Year must be a number'},
              min: {
                args: [1991],
                msg: 'Year must be greater than or equal to 1991',
              },
              max: {
                args: [2024],
                msg: 'Year must be less than or equal to 2024',
              }
            }
          } 
    })
    await queryInterface.createTable('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
              isEmail: true
            }
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          readings: {
            type: DataTypes.JSON,
          }
    })
    await queryInterface.createTable('reading_lists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      title: {
        type: DataTypes.TEXT
      }
    });
    await queryInterface.addColumn('reading_lists', 'blog_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
   })
   await queryInterface.addColumn('reading_lists', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
   }) 
    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
    await queryInterface.addColumn('users', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
    await queryInterface.addColumn('users', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
    await queryInterface.addColumn('blogs', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
    await queryInterface.addColumn('blogs', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }); 
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('reading_lists');
  },
}



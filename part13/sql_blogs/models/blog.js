const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')
const { User } = require('./user')

class Blog extends Model {}


Blog.init({
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
    type: DataTypes.TEXT,
    validate: {
      isInt: {
        msg: 'Year must be a number',
      },
      min: {
        args: [1991],
        msg: 'Year must be greater than or equal to 1991',
      },
      max: {
        args: [2024],
        msg: 'Year must be less than or equal to 2024',
      },
    }
  } 
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'blog',
})

module.exports = Blog


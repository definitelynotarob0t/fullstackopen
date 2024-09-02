const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  readings: {
    type: DataTypes.JSON,
  }
}, {
  sequelize,
  defaultScope: {
    where: {
      disabled: false
    },
  },
  underscored: true,
  timestamps: true,
  modelName: 'user'
})

module.exports = User


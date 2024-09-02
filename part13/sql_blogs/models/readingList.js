const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../util/db')


class ReadingList extends Model {}

ReadingList.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    title: {
        type: DataTypes.TEXT
    },
    blogId: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    }},

    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'ReadingList',
        tableName: 'reading_lists', 
    })
      
module.exports = ReadingList
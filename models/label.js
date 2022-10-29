const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Label extends Model {}

Label.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'label',
}
);

module.exports = Label;

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Policy extends Model {}

Policy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    special_char: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    numbers: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'policy',
}
);

module.exports = Policy;

// lowercase: {
//   type: DataTypes.BOOLEAN,
//   allowNull: false,
//   defaultValue: true,
// },
// uppercase: {
//   type: DataTypes.BOOLEAN,
//   allowNull: false,
//   defaultValue: true,
// },

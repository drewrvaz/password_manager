const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class RainbowTable extends Model {}

RainbowTable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'rainbowtable',
  }
);

module.exports = RainbowTable;

// const bcrypt = require('bcrypt');
// hooks: {
//   beforeCreate: async (newRainbowData) => {
//     newRainbowData.hash = await bcrypt.hash(newRainbowData.hash, 10);
//     return newRainbowData;
//   },
// },
// {
//   hooks: {
//     beforeCreate: async (newUserData) => {
//       newUserData.password = await bcrypt.hash(newUserData.password, 10);
//       return newUserData;
//     },
//   },
//   sequelize,
//   timestamps: false,
//   freezeTableName: true,
//   underscored: true,
//   modelName: 'user',
// }

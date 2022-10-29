const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class RainbowTable extends Model {}

RainbowTable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    hooks: {
      beforeCreate: async (newRainbowData) => {
        newRainbowData.hash = await bcrypt.hash(newRainbowData.hash, 10);
        return newRainbowData;
      },
    },
    
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'rainbowtable',
  }
);

module.exports = RainbowTable;

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

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OneTimePasscode extends Model {}

OneTimePasscode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    passcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiration: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    passphrase_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'passphrase',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = OneTimePasscode;

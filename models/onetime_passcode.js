const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment')
const { onetimePasscode} = require('../utils/helpers');

const time = moment();

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
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },

  },
  {
    hooks: {
      beforeCreate: async (newOTPData) => {
        newOTPData.passcode = onetimePasscode();
        return newOTPData.passcode;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'onetimepasscode',
  }
);

module.exports = OneTimePasscode;

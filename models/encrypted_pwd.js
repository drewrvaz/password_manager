const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { encryptPWD, getPassphraseID} = require('../utils/helpers');
const { Passphrase } = require('../models');

class EncryptedPwd extends Model {}

EncryptedPwd.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    encrypted_password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    hooks: {
      beforeCreate: async (newEncryptedPWDData) => {
        var passphraseData = await sequelize.models.passphrase.findByPk(newEncryptedPWDData.passphraseId);
        newEncryptedPWDData.encrypted_password = encryptPWD(newEncryptedPWDData.encrypted_password, passphraseData.passphrase );
        return newEncryptedPWDData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'encrypted_pwd',
  }
);

module.exports = EncryptedPwd;

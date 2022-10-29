const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { generatePassphrase } = require('../utils/helpers');

class Passphrase extends Model {}

Passphrase.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    passphrase: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(36) ,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: async (newPassphraseData) => {
        newPassphraseData.passphrase = await generatePassphrase();
        return newPassphraseData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'passphrase',
  }
);

module.exports = Passphrase;

// password_id: {
//   type: DataTypes.INTEGER,
//   references: {
//     model: 'encryptedpwd',
//     key: 'id'
//   }
// },
// user_id: {
//   type: DataTypes.INTEGER,
//   references: {
//     model: 'user',
//     key: 'id',
//   },
// },
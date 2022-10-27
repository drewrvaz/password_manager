const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
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
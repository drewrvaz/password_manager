const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'project',
  }
);

module.exports = EncryptedPwd;

const User = require('./user');
const Passphrase = require('./passphrase');
const EncryptedPwd = require('./encrypted_pwd');
const OneTimePasscode = require('./onetime_passcode');
const RainbowTable = require('./rainbow_table');
const SearchContent = require('./search_content')

User.hasMany(Passphrase, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
 
Passphrase.belongsTo(User, {
  foreignKey: 'user_id'
});

EncryptedPwd.hasOne(Passphrase, {
  foreignKey: 'cipher_id',
  onDelete: 'CASCADE'
});

Passphrase.hasOne(EncryptedPwd, {
  foreignKey: 'cipher_id'
});


module.exports = { User, Passphrase, EncryptedPwd, OneTimePasscode, RainbowTable, SearchContent };
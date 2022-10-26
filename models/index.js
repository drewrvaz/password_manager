const User = require('./user');
const Ciphers = require('./ciphers');
const EncryptionKeys = require('./encryption_keys');
const OneTimePasscode = require('./onetime_passcode');
const RainbowTable = require('./rainbow_table');
const SearchContent = require('./search_content')

User.hasMany(Ciphers);
Ciphers.belongsTo(User);
EncryptionKeys.hasOne(Ciphers);
Ciphers.hasOne(EncryptionKeys);


module.exports = { User, Ciphers, EncryptionKeys, OneTimePasscode, RainbowTable, SearchContent }

// User.hasMany(Ciphers, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Ciphers.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// EncryptionKeys.hasOne(Ciphers, {
//   foreignKey: 'cipher_id',
//   onDelete: 'CASCADE'
// });

// Ciphers.hasOne(EncryptionKeys, {
//   foreignKey: 'cipher_id'
// });


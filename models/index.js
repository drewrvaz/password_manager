const User = require('./user');
const Passphrase = require('./passphrase');
const EncryptedPwd = require('./encrypted_pwd');
const OneTimePasscode = require('./onetime_passcode');
const RainbowTable = require('./rainbow_table');
const Avatar = require('./avatar');
const Label = require('./label');
const Policy = require('./policy');

User.hasMany(Passphrase);
Passphrase.belongsTo(User);

Passphrase.hasOne(EncryptedPwd);
EncryptedPwd.belongsTo(Passphrase);

User.hasOne(Avatar);
Avatar.belongsTo(User);

User.hasMany(Label);
Label.belongsTo(User);

// Passphrase.hasOne(Label);
// Label.belongsTo(Passphrase);

User.hasOne(Policy);
Policy.belongsTo(User);

Passphrase.hasOne(OneTimePasscode);
OneTimePasscode.belongsTo(Passphrase);

module.exports = { User, Passphrase, EncryptedPwd, OneTimePasscode, RainbowTable, Avatar, Label, Policy };

// const SearchContent = require('./search_content');
// User.hasMany(Label);
// Label.belongsToMany(User, {through: Passphrase, foreignKey: 'label_id'});
// Passphrase.belongsTo(Label);
// Label.hasMany(Passphrase);
// Label.belongsTo(Passphrase);
// Label.hasMany(Passphrase);
// Passphrase.hasOne(Label);
// Passphrase.hasOne(Label);
// Label.belongsTo(Passphrase);
// Passphrase.belongsTo(Label);
// Label.belongsToMany(Passphrase);
// Label.belongsToMany(Passphrase);

// EncryptedPwd.belongsTo(User, { through: Passphrase });

// User.hasMany(Passphrase, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });
 
// Passphrase.belongsTo(User, {
//   foreignKey: 'user_id'
// });

// EncryptedPwd.hasOne(Passphrase, {
//   foreignKey: 'cipher_id',
//   onDelete: 'CASCADE'
// });

// Passphrase.hasOne(EncryptedPwd, {
//   foreignKey: 'cipher_id'
// });
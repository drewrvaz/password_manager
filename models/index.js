const User = require('./user');
const Passphrase = require('./passphrase');
const EncryptedPwd = require('./encrypted_pwd');
const OneTimePasscode = require('./onetime_passcode');
const RainbowTable = require('./rainbow_table');
const SearchContent = require('./search_content');
const Avatar = require('./avatar');
const Label = require('./label');


User.hasMany(Passphrase);
Passphrase.belongsTo(User);

Passphrase.hasOne(EncryptedPwd);
EncryptedPwd.belongsTo(Passphrase);
EncryptedPwd.belongsTo(User, { through: Passphrase });

Passphrase.hasOne(Label);
Label.belongsTo(Passphrase);

User.hasOne(Avatar);
Avatar.belongsTo(User);

Passphrase.hasOne(OneTimePasscode);
OneTimePasscode.belongsTo(Passphrase);


module.exports = { User, Passphrase, EncryptedPwd, OneTimePasscode, RainbowTable, SearchContent, Avatar, Label};

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
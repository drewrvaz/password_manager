const sequelize = require('../config/connection');
const { User, Passphrase, EncryptedPwd, OneTimePasscode, SearchContent, RainbowTable, Avatar } = require('../models');

const userData = require('./userData.json');
const passphraseData = require('./passphraseData.json');
const encrypted_pwdData = require('./encrypted_passwordData.json');
const otpData = require('./onetime_passcodeData.json');
const searchcontentData = require('./search_contentData.json');
const rainbowtableData = require('./rainbow_tableData.json');
const avatarData = require('./avatarData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Passphrase.bulkCreate(passphraseData);
  await EncryptedPwd.bulkCreate(encrypted_pwdData);
  await OneTimePasscode.bulkCreate(otpData);
  await SearchContent.bulkCreate(searchcontentData);
  await RainbowTable.bulkCreate(rainbowtableData);
  await Avatar.bulkCreate(avatarData);

  process.exit(0);
};

seedDatabase();

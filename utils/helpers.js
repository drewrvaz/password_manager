const crypto = require('crypto-js');
const bcrypt = require('bcrypt');

const encryptPWD = (pwd, passphrase) => {
  var encrypted = crypto.AES.encrypt(pwd, passphrase);
  return encrypted.toString();
};

const decryptPWD = (pwd, passphrase) => {
  var decrypted = crypto.AES.decrypt(pwd, passphrase);
  return decrypted.toString(crypto.enc.Utf8);
};

const onetimePasscode = () => {
  var digits = "0123456789";

    let OTP = "";
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
  
  return OTP;
};

async function generatePassphrase() {  
  var passphrase = await bcrypt.hash(onetimePasscode(), 2);
  return passphrase;
}

module.exports = {encryptPWD, decryptPWD, onetimePasscode, generatePassphrase};

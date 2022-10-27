
const crypto = require('crypto-js');

const encryptPWD = (pwd, passphrase) => {
  var encrypted = crypto.AES.encrypt(pwd, passphrase);
  return encrypted;
};

const decryptPWD = (pwd, passphrase) => {
  var decrypted = crypto.AES.encrypt(pwd, passphrase);
  return decrypted;
};

const onetimePasscode = () => {
  var digits = "0123456789";

    let OTP = "";
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
  
  return OTP;
};

module.exports = {encryptPWD, decryptPWD, onetimePasscode};

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const encryptedPWDRoutes = require('./encryptedPWDRoutes');
const passcodeRoutes = require('./onetimePasscodeRoutes');
const rainbowRoutes = require('./rainbowTableRoutes');
const passphraseRoutes = require('./passphraseRoutes');
const labelRoutes = require('./labelRoutes');

router.use('/users', userRoutes);
router.use('/encrypted_pwd', encryptedPWDRoutes);
router.use('/onetime_passcode', passcodeRoutes);
router.use('/rainbow_table', rainbowRoutes);
router.use('/passphrase', passphraseRoutes);
router.use('/label', labelRoutes);

module.exports = router;

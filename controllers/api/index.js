const router = require('express').Router();
const userRoutes = require('./userRoutes');
const encryptionRoutes = require('./encryptionKeyRoutes');
const passcodeRoutes = require('./onetimePasscodeRoutes');
const rainbowRoutes = require('./rainbowTableRoutes');
const cipherRoutes = require('./cipherRoutes');

router.use('/users', userRoutes);
router.use('/encryption_keys', encryptionRoutes);
router.use('/onetime_passcode', passcodeRoutes);
router.use('/rainbow_table', rainbowRoutes);
router.use('/ciphers', cipherRoutes);

module.exports = router;

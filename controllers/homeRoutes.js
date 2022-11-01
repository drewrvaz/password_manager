const router = require('express').Router();
const { Passphrase, EncryptedPwd, Label, OneTimePasscode, RainbowTable, Policy } = require('../models');
const withAuth = require('../utils/auth');
const { decryptPWD, onetimePasscode, encryptPWD } = require('../utils/helpers');
const moment = require('moment');

router.get('/', withAuth ,async (req, res) => {
  try {

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
  
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');

});

router.get('/dashboard', withAuth, async (req, res) => {

  try {

    const passphraseData = await Passphrase.findAll({ where: { userId: req.session.user_id } });
    const passphrases = passphraseData.map((passphrase) => passphrase.get({ plain: true }));

    const labelData = await Label.findAll();
    const labels = labelData.map((label) => label.get({ plain: true }));

    res.render('dashboard', { username: req.session.username, passphrases, logged_in: req.session.logged_in, lastlogged_in: req.session.lastlogged_in, labels,});

  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/dashboard', withAuth, async (req, res) => {

  try {

    var labelId = 1;
    var labelData = null;

    if (req.body.label) {
       labelData = await Label.findOne({
        where: {
          name: req.body.label
        }
      });

      if (!labelData) {
        labelData = await Label.create({
          name: req.body.label,
        });
        
        labelData = await Label.findOne({
          where: {
            name: req.body.label
          }
        });
      }
      labelId = labelData.id;
    }

    const passphraseData = await Passphrase.create({
      passphrase: req.body.passphrase,
      url: req.body.url,
      name: req.body.name,
      username: req.body.username,
      userId: req.session.user_id,
      label_id: labelId
    });

    await EncryptedPwd.create({
      encrypted_password: req.body.password,
      passphraseId: passphraseData.id
    });
    
  }
  catch (err) {
    console.log(err);
  }

  res.json({message:"Password added to the database."});

});

router.post('/retrievePWD', withAuth, async (req, res) => {

  try {
    const passphraseData = await Passphrase.findOne({ where: { id: req.body.id }, include: [{ model: EncryptedPwd }], });
    const password = decryptPWD(passphraseData.encrypted_pwd.encrypted_password, passphraseData.passphrase);
    
    res.status(200).json(password);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/retrieveOTP', withAuth, async (req, res) => {

  try {

    let otpData = await OneTimePasscode.findOne({ where: { passphraseId: req.body.id }});
    const expiry = moment().add(1, 'hours');
    const passcode = onetimePasscode();

    let data =  {
      "passcode": passcode,
      "expiration": expiry.format(),
      "passphraseId": req.body.id
    }

    if (otpData){
      otpData = await OneTimePasscode.update(data, {where: {
        id: otpData.id,
      }});
    }
    else {
      otpData = await OneTimePasscode.create(data);
      console.log("here");
    }

    // console.log({"passcode":passcode});
    console.log("Here");
    res.status(200).json({"passcode":passcode});
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/useOTPretrievePWD', withAuth, async (req, res) => { //withAuth

  try {
    const otpData = await OneTimePasscode.findOne({ where: { passcode: req.body.passcode }});
    const expTime = moment(otpData.expiration);
    const currTime = moment();

    if (currTime.isBefore(expTime)) {
      const passphraseData = await Passphrase.findOne({ where: { id: otpData.passphraseId }, include: [{ model: EncryptedPwd }], });
    
    const password = decryptPWD(passphraseData.encrypted_pwd.encrypted_password, passphraseData.passphrase);
    res.status(200).json({"password":password});
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/editPWD/:id', async (req, res) => { //withAuth

  try {

    const passphraseData = await Passphrase.findOne({ where: { id: req.params.id }, include: [{ model: EncryptedPwd }], });
    const labelData = await Label.findByPk(passphraseData.label_id);

    if (labelData) labelName = labelData.name;
    else labName = "All";

    const password = decryptPWD(passphraseData.encrypted_pwd.encrypted_password, passphraseData.passphrase);
    const data =  {
      "name": passphraseData.name,
      "username": passphraseData.username,
      "password": password,
      "label": labelName,
      "url": passphraseData.url
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/editPWD', withAuth, async (req, res) => { 

  try {
    var labelId = 1;
    var labelData = null;

    if (req.body.label) {

       labelData = await Label.findOne({
        where: {
          name: req.body.label
        }
      });

      if (!labelData) {
        labelData = await Label.create({
          name: req.body.label,
        });
        
        labelData = await Label.findOne({
          where: {
            name: req.body.label
          }
        });
      }
      labelId = labelData.id;
    }

    await Passphrase.update({
      url: req.body.url,
      name: req.body.name,
      username: req.body.username,
      label_id: labelId
      }, 
      { 
        where: {
          id: req.body.id,
        },
      });

    const passphraseData = await Passphrase.findByPk(req.body.id);
    const encryptedPassword = encryptPWD(req.body.password, passphraseData.passphrase);

    await EncryptedPwd.update({
      encrypted_password: encryptedPassword,
      },
      { 
        where: {
          passphraseId: req.body.id,
        },
    });
    res.status(200).json({message:"Password card updated"});
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/testPWD', withAuth, async (req, res) => { 

  try {
    var testResult = false;
    var rainbowtableData = null;

    if (req.body.password) {

       rainbowtableData = await RainbowTable.findOne({
        where: {
          password: req.body.password
        }
      });

      if (rainbowtableData) testResult = true;
    }

    res.status(200).json({result:testResult});
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/setPolicy', withAuth, async (req, res) => { 

  try {
    var policyData = await Policy.findOne({
      where: {
        userId: req.session.user_id
      }
    });

    if (req.body) {
      if (policyData) {
        await Policy.update({
          length: req.body.length,
          special_char: req.body.special_char,
          numbers: req.body.numbers,
          lowercase: req.body.lowercase,
          uppercase: req.body.uppercase,
        },
        {
          where: {
            userId: req.body.userId
          }
        });
      } else await Policy.create({
        length: req.body.length,
        special_char: req.body.special_char,
        numbers: req.body.numbers,
        lowercase: req.body.lowercase,
        uppercase: req.body.uppercase,
        userId: req.session.user_id,
      });
      
      res.status(200).json({message:"Success"});
    } else res.status(400).json({message:"Bad Request"});

  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/labelNameToId', async (req, res) => { //withAuth

  try {
    var labelData = await Label.findOne({
      where: {
        name: req.body.name
      }
    });

    if (req.body) {
      if (labelData.id) res.status(200).json({id:labelData.id});
      else res.status(400).json({message:"Bad Request"});
    }

  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

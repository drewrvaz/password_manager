const router = require('express').Router();
const { Passphrase, EncryptedPwd, Label, OneTimePasscode, RainbowTable, Policy } = require('../models');
const withAuth = require('../utils/auth');
const { decryptPWD, onetimePasscode, encryptPWD } = require('../utils/helpers');
const moment = require('moment');
const { Op } = require('sequelize');

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

// get all password cards and display them on the dashboard
router.get('/dashboard', withAuth, async (req, res) => {

  try {

    const passphraseData = await Passphrase.findAll({ where: { userId: req.session.user_id } });
    const passphrases = passphraseData.map((passphrase) => passphrase.get({ plain: true }));

    const labelData = await Label.findAll({ 
      order:[
        ['id', 'ASC'],
      ],
      where: { 
        [Op.or]: [
          {userId: null },
          {userId: req.session.user_id }
        ]
      }
    });
    
    
    const labels = labelData.map((label) => label.get({ plain: true }));
    // console.log(labels);

    res.render('dashboard', { username: req.session.username, passphrases, logged_in: req.session.logged_in, lastlogged_in: req.session.lastlogged_in, labels,});

  } catch (err) {
    res.status(500).json(err);
  }

});

// create a password card
router.post('/dashboard', withAuth, async (req, res) => {

  try {

    var labelId = 1;
    var labelData = null;

    if (req.body && req.body.name && req.body.password && req.body.confirmPassword) {

      if (req.body.label) {
        labelData = await Label.findOne({
          where: {
            name: req.body.label,
            userId: req.session.user_id
          }
        });

        if (!labelData) {
          labelData = await Label.create({
            name: req.body.label,
            userId: req.session.user_id
          });
          
          labelData = await Label.findOne({
            where: {
              name: req.body.label,
              userId: req.session.user_id
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

      res.json({message:"Password added to the database."});
    } else {

      res.json({message:"Error missing parameters in request"});

    }

  } catch (err) {
      console.log(err);
      res.json({message: err});
     
    }

    

});

// Get PWD using passphrase
router.post('/retrievePWD', withAuth, async (req, res) => {

  try {
    const passphraseData = await Passphrase.findOne({ where: { id: req.body.id }, include: [{ model: EncryptedPwd }], });
    const password = decryptPWD(passphraseData.encrypted_pwd.encrypted_password, passphraseData.passphrase);
    
    res.status(200).json(password);
  } catch (err) {
    res.status(500).json(err);
  }

});

// Get an OTP associated with a passphrase/password
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
    }

    res.status(200).json({"passcode": passcode});
  } catch (err) {
    res.status(500).json(err);
  }

});

// Retrieve pwd using otp
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

// get password card information using a passphrase id
router.get('/editPWD/:id', async (req, res) => { //withAuth

  try {

    const passphraseData = await Passphrase.findOne({ where: { id: req.params.id }, include: [{ model: EncryptedPwd }], });
    const labelData = await Label.findByPk(passphraseData.label_id);
    var labelName = "";

    if (labelData && (passphraseData.label_id !== 1)) labelName = labelData.name;

    const password = decryptPWD(passphraseData.encrypted_pwd.encrypted_password, passphraseData.passphrase);
    const data =  {
      "name": passphraseData.name,
      "username": passphraseData.username,
      "password": password,
      "label": labelName,
      "url": passphraseData.url
    }

    // console.log(data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }

});

//edit password cardAll
router.post('/editPWD', withAuth, async (req, res) => { 

  try {
    var labelId = 1;
    var labelData = null;

    if (req.body.label) {

       labelData = await Label.findOne({
        where: {
          name: req.body.label,
          userId: req.session.user_id
        }
      });

      if (!labelData) {
        labelData = await Label.create({
          name: req.body.label,
          userId: req.session.user_id
        });
        
        labelData = await Label.findOne({
          where: {
            name: req.body.label,
            userId: req.session.user_id
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

//Test a pwd against a DB of common passwords
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

//set Password Policy
router.get('/getPolicy', withAuth, async (req, res) => { 
  var policy = {
    "length": 15,
    "special_char": true,
    "numbers": true
  }

  try {
    var policyData = await Policy.findOne({
      where: {
        userId: req.session.user_id
      }
    });


    if (policyData) {
      policy.length = policyData.length;
      policy.special_char = policyData.special_char;
      policy.numbers = policyData.numbers;
    } 
      // console.log(policy);
      res.status(200).json(policy);
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//set Password Policy
router.post('/setPolicy', withAuth, async (req, res) => { 

  try {
    var policyData = await Policy.findOne({
      where: {
        userId: req.session.user_id
      }
    });

    if (req.body) {
      // console.log(policyData);
      if (policyData) {
        await Policy.update({
          length: req.body.length,
          special_char: req.body.special_char,
          numbers: req.body.numbers,
        },
        {
          where: {
            userId: req.session.user_id
          }
        });
      } else await Policy.create({
        length: req.body.length,
        special_char: req.body.special_char,
        numbers: req.body.numbers,
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


//Retrieve Label id using its name
router.post('/labelNameToId', withAuth, async (req, res) => { 

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

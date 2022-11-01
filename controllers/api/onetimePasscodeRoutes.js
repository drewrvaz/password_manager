const router = require('express').Router();
const { OneTimePasscode } = require('../../models');


// GET all passphrases
router.get('/', (req, res) => {
  OneTimePasscode.findAll()
  .then((dbOneTimePasscode) => res.status(200).json(dbOneTimePasscode))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get one passphrase
router.get('/:id', (req, res)=> {
  OneTimePasscode.findByPk(req.params.id)
  .then((dbOneTimePasscode) => res.status(200).json(dbOneTimePasscode))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create new onetime passcode
router.post('/', (req, res) => {

  OneTimePasscode.create({
    passcode: req.body.passcode,
    expiration: req.body.expiration
  })
  .then((dbOneTimePasscode) => res.status(200).json(dbOneTimePasscode))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete onetime passcode
router.delete('/:id', (req, res) => {
  OneTimePasscode.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbOneTimePasscode => {
    if (!dbOneTimePasscode) {
      res.status(404).json({ message: 'No onetime passcode with this id!' });
      return;
    }
    res.status(200).json(dbOneTimePasscode);
  }) 
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

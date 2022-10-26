const router = require('express').Router();
const { Passphrase } = require('../../models');

// GET all passphrases
router.get('/', (req, res) => {
  Passphrase.findall()
  .then((dbPassphraseData) => res.status(200).json(dbPassphraseData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get one passphrase
router.get('./:id', (req, res)=> {
  Passphrase.findByPk(req.params.id)
  .then((dbPassphraseData) => res.status(200).json(dbPassphraseData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create new passphrase
router.post('/', (req, res) => {
  Passphrase.create({
    passphrase: req.body.passphrase,
    url: req.body.url
  })
  .then((dbPassphraseData) => res.status(200).json(dbPassphraseData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Update passphrase
router.put('/', (req, res) => {
  Passphrase.update({
    passphrase: req.body.passphrase
  })
  .then((dbPassphraseData) => res.status(200).json(dbPassphraseData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
})

// Delete passphrase
router.delete('/:id', (req, res) => {
  Passphrase.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbPassphraseData => {
    if (!dbPassphraseData) {
      res.status(404).json({ message: 'No passphrase found with this id!' });
      return;
    }
    res.status(200).json(dbPassphraseData);
  }) 
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

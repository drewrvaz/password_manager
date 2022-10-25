const router = require('express').Router();
const { Ciphers } = require('../../models');

// GET all ciphers
router.get('/', (req, res) => {
  Ciphers.findall()
  .then((dbCipherData) => res.status(200).json(dbCipherData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create new cipher
router.post('/', (req, res) => {
  Ciphers.create({
    cipher: req.body.cipher,
    url: req.body.url
  })
  .then((dbCipherData) => res.status(200).json(dbCipherData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Update cipher
router.put('/', (req, res) => {
  Ciphers.update({
    cipher: req.body.cipher
  })
  .then((dbCipherData) => res.status(200).json(dbCipherData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
})

// Delete cipher
router.delete('/:id', (req, res) => {
  Ciphers.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbCipherData => {
    if (!dbCipherData) {
      res.status(404).json({ message: 'No cipher found with this id!' });
      return;
    }
    res.status(200).json(dbCipherData);
  }) 
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

const router = require('express').Router();
const { EncryptionKeys } = require('../../models');

// GET all encryption keys
router.get('/', (req, res) => {
  EncryptionKeys.findall()
  .then((dbEncryptionKey) => res.status(200).json(dbEncryptionKey))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create new encryption key
router.post('/', (req, res) => {
  EncryptionKeys.create({
    encryption_key: req.body.encryption_key,
    url: req.body.url
  })
  .then((dbEncryptionKey) => res.status(200).json(dbEncryptionKey))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete encryption key
router.delete('/:id', (req, res) => {
  EncryptionKeys.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbEncryptionKey => {
    if (!dbEncryptionKey) {
      res.status(404).json({ message: 'No encryption key found with this id!' });
      return;
    }
    res.status(200).json(dbEncryptionKey);
  }) 
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

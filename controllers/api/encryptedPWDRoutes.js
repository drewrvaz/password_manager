const router = require('express').Router();
const { EncryptedPwd } = require('../../models');

// GET all encrypted passwords
router.get('/', (req, res) => {
  EncryptedPwd.findall()
  .then((dbEncryptedPwd) => res.status(200).json(dbEncryptedPwd))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create new encrypted password
router.post('/', (req, res) => {
  EncryptedPwd.create({
    encrypted_pwd: req.body.encrypted_password
  })
  .then((dbEncryptedPwd) => res.status(200).json(dbEncryptedPwd))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete encrypted password
router.delete('/:id', (req, res) => {
  EncryptedPwd.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbEncryptedPwd => {
    if (!dbEncryptedPwd) {
      res.status(404).json({ message: 'No encrypted password found with this id!' });
      return;
    }
    res.status(200).json(dbEncryptedPwd);
  }) 
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

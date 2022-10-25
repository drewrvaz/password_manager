const router = require('express').Router();
const { RainbowTable } = require('../../models');

// GET all rainbow tables
router.get('/', (req, res) => {
  RainbowTable.findall()
  .then((dbRainbowTable) => res.status(200).json(dbRainbowTable))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create new rainbow table
router.post('/', (req, res) => {
  RainbowTable.create({
    passcode: req.body.passcode,
    expiration: req.body.expiration
  })
  .then((dbRainbowTable) => res.status(200).json(dbRainbowTable))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete rainbow table
RainbowTable.delete('/:id', (req, res) => {
  RainbowTable.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbRainbowTable => {
    if (!dbRainbowTable) {
      res.status(404).json({ message: 'No onetime passcode with this id!' });
      return;
    }
    res.status(200).json(dbRainbowTable);
  }) 
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

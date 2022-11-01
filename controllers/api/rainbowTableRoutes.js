const router = require('express').Router();
const { RainbowTable } = require('../../models');

// GET all rainbow tables
router.get('/', (req, res) => {
  RainbowTable.findAll()
  .then((dbRainbowTable) => res.status(200).json(dbRainbowTable))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create new rainbow table
router.post('/', (req, res) => {
  RainbowTable.create({
    password: req.body.password,
  })
  .then((dbRainbowTable) => res.status(200).json(dbRainbowTable))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Delete rainbow table
router.delete('/:id', (req, res) => {
  RainbowTable.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbRainbowTable => {
    if (!dbRainbowTable) {
      res.status(404).json({ message: 'No rainbow table item with this id!' });
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

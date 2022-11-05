const router = require('express').Router();
const { Label } = require('../../models');

// GET all Labels
router.get('/', (req, res) => {
  Label.findAll()
  .then((dbLabelData) => res.status(200).json(dbLabelData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get one Label
router.get('/:id', (req, res)=> {
  Label.findByPk(req.params.id)
  .then((dbLabelData) => res.status(200).json(dbLabelData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Create new Label
router.post('/', (req, res) => {
  Label.create({
    Label: req.body.Label,
    url: req.body.url,
    name: req.body.name,
    userId: req.body.userId
  })
  .then((dbLabelData) => res.status(200).json(dbLabelData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Update Label
router.put('/', (req, res) => {
  Label.update({
    Label: req.body.Label
  })
  .then((dbLabelData) => res.status(200).json(dbLabelData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
})

// Delete Label
router.delete('/:id', (req, res) => {
  Label.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbLabelData => {
    if (!dbLabelData) {
      res.status(404).json({ message: 'No Label found with this id!' });
      return;
    }
    res.status(200).json(dbLabelData);
  }) 
  .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

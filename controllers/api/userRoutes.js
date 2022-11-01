const router = require('express').Router();
const { User } = require('../../models');
const moment = require('moment');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
        
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    let lastDate = moment(userData.lastLoggedIn).format('MM-DD-YYYY HH:mm:ss');
    console.log(lastDate);


    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.lastlogged_in = lastDate;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

    await User.update({lastLoggedIn: moment().format('YYYY-MM-DD HH:mm:ss')},{ where: { username: req.body.username } });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    await User.create({ 
      username: req.body.username,
      password: req.body.password
    });
    res.json({ user: req.body.username, message: 'You are now signed up!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
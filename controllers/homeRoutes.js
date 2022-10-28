const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

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

router.get('/dashboard', withAuth, async (req, res) => {

  try {
    res.render('dashboard', { logged_in: req.session.logged_in, });

  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;

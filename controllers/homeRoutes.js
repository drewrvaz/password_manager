const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {

    res.redirect('/home');
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

router.get('/dashboard', async (req, res) => {

  // const postData = await Posts.findAll({
  //   include: [{ model: User, attributes: { exclude: ['password','id'] } }], 
  // }).catch((err) => { 
  //   res.json(err);
  // });
  try {
    // const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(posts)
    res.render('dashboard', { logged_in: req.session.logged_in, });

  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;

const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login-failed' }),
  (req, res) => {
    res.redirect('/auth/login-success');
  }
);

router.get('/login-success', (req, res) => {
  res.send('OAuth login successful');
});

router.get('/login-failed', (req, res) => {
  res.send('OAuth login failed');
});

module.exports = router;

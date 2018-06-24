const config = require('../config');

const express = require('express');
const passport = require('passport');
const google = require('passport-google-oauth').OAuth2Strategy;

passport.use(new google({
  clientID: config.auth.google.clientId,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: 'https://api.segfault.me/auth/google/callback'
}, (accessTok, refreshTok, profile, done) => {
  // TODO: Emit JWT for identity.
  console.log("It worked.");
  done(null, { user: profile.id });
}));

const auth = express.Router()

auth.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
}));

auth.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => { res.redirect('/'); }
);

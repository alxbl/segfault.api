const config = require('../config');

const express = require('express');
const passport = require('passport');
const google = require('passport-google-oauth').OAuth2Strategy;

passport.use(new google({
  clientID: config.auth.google.clientId,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: config.auth.google.redirect,
  session: false
}, (accessTok, refreshTok, profile, done) => {
  // TODO: Emit JWT for identity.
  // TODO: Update profile info or create.
  let id = profile.id;
  let name = profile.displayName;
  // let url =  ...
  let img = profile.photos ? profile.photos[0] : null;

  done(null, { user: id });
}));

const auth = express.Router()

auth.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login'],
  session: false
}));

auth.get('/google/callback', passport.authenticate('google', {
  session: false,
  failureRedirect: '/' }),
  (req, res) => { res.redirect('/'); }
);

module.exports = auth;

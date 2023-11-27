const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
      done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: 'http://localhost:5001/auth/google/callback',
      passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
      // Check or save the user to your database here
      // For PostgreSQL, interact with your database
      // Call `done()` when finished
      done();
    }
  )
);

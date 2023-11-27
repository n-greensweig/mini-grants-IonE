require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./strategies/user.strategy');
const GoogleStrategy = require('passport-google-oauth20');
const sessionMiddleware = require('./modules/session-middleware');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
})

if (process.env.googleClientID && process.env.googleClientSecret) {
  passport.use(new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: process.env.callbackURL
  },
  async (accessToken, refreshToken, profile, cb) => {
    console.log('Google Login Complete', profile);
    //Find or create user in app database here
    return cb(err, user);
  }))
}

// Route includes
const userRouter = require('./routes/user.router');
const oauthRouter = require('./routes/oauth.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/auth', oauthRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

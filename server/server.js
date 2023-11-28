require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('./strategies/user.strategy');
const cookieSession = require('cookie-session');
const sessionMiddleware = require('./modules/session-middleware');
const pool = require('./modules/pool');

// Route includes
const userRouter = require('./routes/user.router');
const oauthRouter = require('./routes/oauth.router');
const grantsRouter = require('./routes/grants.router')
const dataGenRoute = require('./routes/dataGen.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = require('passport-google-oauth20').Strategy;
console.log(GoogleStrategy);
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL: 'http://localhost:5001/auth/google/callback',
    passReqToCallback   : true
    },
    async function(request, accessToken, refreshToken, profile, done) {
      //Check or save the user to database here
      console.log(profile);
      try {
       
        if (profile.emails.length > 0) {
          const firstEmail = profile.emails[0];
          if (firstEmail.verified === true) {
            const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [firstEmail.value]);
            const user = result && result.rows && result.rows[0];
            if (user) {
              console.log('Existing User Found', user);
              return done(null, user);
            } else {
              console.log('Create new user condition called');
              // const password = null;
              const email = firstEmail.value;
              const fullName = profile.displayName;
              const googleId = profile.id;

              const queryText = `INSERT INTO "user" (email, full_name, google_id)
                      VALUES ($1, $2, $3) RETURNING id;`;
              await pool.query(queryText, [email, fullName, googleId]);
              const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
              const user = result && result.rows && result.rows[0];
              if (user) {
                //User created sucessfully
                console.log('User Created sucessfully');
                return done(null, user);
              } else {
                //Something went wrong here in creating the user
                console.log('It broke');
                return done(null, null);
              }
            }
          } else {
            //Email not verified
            console.log('Email not verified');
            return done(null, null);
          }
        } else {
          //No email found
          console.log('No Email Found');
          return done (null, null);
        }
      
      } catch (error) {
        console.error(error);
        // return done(error, null); //This will return a 500 server error
      }

    }
));

app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}));



/* Routes */
app.use('/api/user', userRouter);
app.use('/auth', oauthRouter);
app.use('/grants', grantsRouter);
app.use('/dataGen', dataGenRoute);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

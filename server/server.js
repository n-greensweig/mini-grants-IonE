require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('./strategies/user.strategy');
const cookieSession = require('cookie-session');
const sessionMiddleware = require('./modules/session-middleware');
const pool = require('./modules/pool');
const cors = require('cors');
// Route includes
const userRouter = require('./routes/user.router');
const oauthRouter = require('./routes/oauth.router');
const grantsRouter = require('./routes/grants.router')
const dataGenRoute = require('./routes/dataGen.router');
const googleSheetsRoute = require('./routes/googleSheets.router');
const reviewerRoute = require('./routes/reviewer.router');
const { getInitials } = require('./modules/utilityFunctions');
const departmentRoute = require('./routes/departments.router')

let id = '';
let email = '';
let fullName = '';
let googleId = '';
let avatarPic = '';
let admin = false;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = require('passport-google-oauth20').Strategy;
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

let callbackURL = `${process.env.BASE_URL}/auth/google/callback`;
if (process.env.NODE_ENV !== 'production') {
  callbackURL = `http://localhost:5001/auth/google/callback`;
}

passport.use(new GoogleStrategy({
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret,
    callbackURL,
    passReqToCallback   : true
    },
    async function(request, accessToken, refreshToken, profile, done) {
      //Check or save the user to database here
      try {
       
        if (profile.emails.length > 0) {
          const firstEmail = profile.emails[0];
          if (firstEmail.verified === true) {
            const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [firstEmail.value]);
            const user = result && result.rows && result.rows[0];
            if (user) {
              console.log('Existing User Found', user);
              id = user.id;
              email = user.email;
              fullName = user.full_name;
              googleId = user.google_id;
              admin = user.admin;
              avatarPic = user.avatarPic;
              return done(null, user);
            } else {
              console.log('Create new user condition called');
              // const password = null;
              email = firstEmail.value;
              fullName = profile.displayName;
              googleId = profile.id;
              avatarPic = profile.photos[0].value;
      
              const queryText = `INSERT INTO "user" ("email", "full_name", "google_id", "avatarPic")
                      VALUES ($1, $2, $3, $4) RETURNING id;`;
              await pool.query(queryText, [email, fullName, googleId, avatarPic]);
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

app.get('/logout', (req, res) => {
  req.logout();
  req.session = null;
  res.clearCookie('google-auth-session');
  res.redirect('/');
  
});


app.get('/userInfoRoute', async (req,res) => {
  if (req.isAuthenticated()) {
  const initials = getInitials(fullName);
  res.send({ id: id, email: email, fullName:fullName, initials: initials, gogoleId: googleId, avatarPic: avatarPic, admin: admin });
  } else {
    res.sendStatus(401);
  }

});



app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.BASE_URL}/#/login` }),
  (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
      res.redirect(`${process.env.BASE_URL}/#/home`);
    } else {
      res.redirect(`/userInfoRoute`); // TODO: After login page.
    }
  }
);

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}));



/* Routes */
app.use('/api/user', userRouter);
app.use('/auth', oauthRouter);
app.use('/grants', grantsRouter);
app.use('/dataGen', dataGenRoute);
app.use('/googleSheets', googleSheetsRoute);
app.use('/reviewer', reviewerRoute);
app.use('/departments', departmentRoute);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

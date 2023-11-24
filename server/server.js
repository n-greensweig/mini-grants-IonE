const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('./strategies/user.strategy');


require('dotenv').config();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:5001',
  })
);

const sessionMiddleware = require('./modules/session-middleware');

app.use(cookieSession({
  name: 'session',
  keys: [process.env.googleKeys]
}));

const auth = require('./strategies/auth');

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
app.use('/api/oauth', oauthRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5001;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res) => {
    console.log('/api/oauth route called');
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }});


router.get('/google', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  }, passport.authenticate('google', { scope: ['profile'] }));

router.get('/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        //Successful authentication
        res.redirect('/');
    }
)


router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});


module.exports = router;
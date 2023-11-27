const express = require('express');
const pool = require('../modules/pool');
const passport = require('passport');
require('../strategies/auth');
const router = express.Router();

// auth(passport);
// router.use(passport.initialize());

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

// router.get('/login', passport.authenticate('google'));

router.get('/login', (req, res, next) => {
    console.log('Riley');
    res.setHeader('Access-Control-Allow-Origin', '*');
    passport.authenticate('google', { scope: ['email', 'profile'] })
});

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}),
    (req, res) => {
        console.log('Line 30')
        req.session.token = req.user.token;
        res.send(201);
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});


module.exports = router;
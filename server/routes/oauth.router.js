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


router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        //Successful authentication
        console.log('Callback function run');
        res.redirect('/');
    }
)

router.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});


module.exports = router;
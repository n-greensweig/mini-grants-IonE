const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { thirdMondayOfMarch, lastSundayOfApril, secondMondayOfSeptember, penultimateSundayOfOctober } = require('../modules/utilityFunctions')


router.get('/generateGrantCycles', (req, res) => {
    if (req.isAuthenticated()) {
    let queryText = `INSERT INTO "grant_cycle" ("start_date", "end_date", "grant_type", "cycle_complete", "cycle_name")
                    VALUES ($1, $2, $3, $4, $5);`;
    
    let year = 2015;

    for (let i = 0; i < 40; i++) {
        let start_date_spring = thirdMondayOfMarch(year);
        let end_date_spring = lastSundayOfApril(year);
        let fall_start_date = secondMondayOfSeptember(year);
        let fall_end_date = penultimateSundayOfOctober(year);
        let springName = 'Spring-' + year;
        let FallName = 'Fall-' + year;
        console.log(start_date_spring, i);
        pool.query(queryText, [start_date_spring, end_date_spring, "mini", "false", springName])
        .then((response) => {
            res.send(201);
        }).catch((error) => {
            console.log(error);
            res.send(500);
        });
        
        pool.query(queryText, [fall_start_date, fall_end_date, "mini", "false", FallName])
        .then((response) => {
            res.send(201);
        }).catch((error) => {
            console.log(error);
            res.send(500);
        });
        year++;
        }
    } else { //end of Auth if statement
        res.sendStatus(401);
    }
    })

    module.exports = router;
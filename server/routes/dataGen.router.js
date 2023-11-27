const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

import { thirdMondayOfMarch, lastSundayOfApril, secondMondayOfSeptember, penultimateSundayOfOctober } from '../../src/utilityFunctions';


router.post('/generateGrantCycles', (req, res) => {
    let queryText = `INSERT INTO "grant_cycle" ("start_date", "end_date", "grant_type", "cycle_complete")
                    VALUES ($1, $2, $3, $4);`;
    let year = 2024;

    for (let i = 0; i < 20; i++) {
        let start_date_spring = thirdMondayOfMarch(year);
        let end_date_spring = secondMondayOfSeptember(year);
        let fall_start_date = secondMondayOfSeptember(year);
        let fall_end_date = penultimateSundayOfOctober(year);
        
        pool.queryText(queryText, [])
    }
})
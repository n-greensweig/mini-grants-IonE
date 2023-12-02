const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST all data from form to DB
router.post('/', (req, res) => {
    console.log('reviewer router post has been hit');
    console.log('req.body', req.body);
    if(req.isAuthenticated()) {
       const {name, grantsToReview, department} = req.body;

       const insertQuery = `
            INSERT INTO "reviewers" ("name", "available_reviews", "dept_id")
            VALUES ($1, $2, $3)
            RETURNING *;
        `;

        const values = [name, grantsToReview, department];

        pool.query(insertQuery, values)
        .then(result => {
            const insertedReviewer = result.rows[0];
            console.log('Reviewer has been inserted:', insertedReviewer);
            res.status(201);
        })
        .catch(error => {
            console.log(`Error fetching all grant data`, error);
            res.sendStatus(500);
        });
    } else {
        console.log('user unauthorized');
        res.status(401);
    }
}); //end POST

// GET data 
router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        let queryText = 'SELECT * FROM "reviewers"';
        console.log('Fetching all reviewer data')
        pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Error fetching all reviewer data`, error);
            res.sendStatus(500);
        });
    }
}); //end GET

module.exports = router;

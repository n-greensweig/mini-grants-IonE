const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// POST all data from form to DB
router.post('/', (req, res) => {
    console.log('reviewer router post has been hit');
    console.log('req.body', req.body);

       const {name, grantsToReview, department} = req.body;

       const insertQuery = `
            INSERT INTO "reviewers" ("name", "available_reviews", "dept_id")
            VALUES ($1, $2, $3);
        `;

        const values = [name, grantsToReview, department];

        pool.query(insertQuery, values)
        .then(result => {
            const insertedReviewer = result.rows[0];
            console.log('Reviewer has been inserted:', insertedReviewer);
            res.status(201);
        })
        .catch(error => {
            console.log(`Error running query ${insertQuery}`, error);
            res.sendStatus(500);
        });
   
}); //end POST

router.post('/assignReviewer', (req, res) => {
    const queryString = `INSERT INTO "grant_assignments" ("assigned_at", "assigned_by", "grant_id", "reviewer_id", "cycle_id")
                        VALUES($1, $2, $3, $4, $5);`;

    const currentDate = new Date();

    pool.query(queryString, [currentDate, req.body.assigned_by, req.body.grant_id, req.body.reviewer_id, req.body.cycle_id])
    .then((response) => {
        console.log(response);
        res.sendStatus(201);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

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

router.get('/reviewerData', (req, res) => {
    if (req.isAuthenticated()) {
        let userId = req.params.id;
        let cycleId = req.params.cycleId;
        let queryString = `SELECT * FROM "reviewers" WHERE "reviewer_id" = $1 AND "cycle_id" = $2;`;
        pool.query(queryString, [userId, cycleId])
        .then((response) => {
            res.send(response.rows);
        }).catch((error) => {
            console.error(`Error making query ${queryString}`, error);
        })
    } else {
        res.sendStatus(401);
    }
})

module.exports = router;

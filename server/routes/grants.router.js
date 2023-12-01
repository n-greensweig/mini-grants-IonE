const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const bcrypt = require('bcryptjs');

//GET all grant data
router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        let queryText = 'SELECT * from "grant_data";';
        console.log('Fetching all grant data')
        pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Error fetching all grant data`, error);
            res.sendStatus(500);
        });
    }
}); //end GET


// GET all reviewers --HALEIGH
router.get('/reviewers', (req, res) => {
    if(req.isAuthenticated()) {
        let queryText = 'SELECT * from "reviewers";';
        console.log('Fetching all reviewers')
        pool.query(queryText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log(`Error fetching all reviewers`, error);
            res.sendStatus(500);
        });
    }
}); //end GET


//GET unreviewed grants --HALEIGH, need to test all my routes with data
router.get('/unreviewed', (req, res) => {
    console.log('Fetching all unreviewed grants')
    if(req.isAuthenticated()) {
    let queryText = `SELECT COUNT(DISTINCT g.id) as "reviews", g.*
                    FROM grants_data g
                    JOIN scores s
                    ON g.id = s.grant_id
                    WHERE review_complete = TRUE;`;
    pool.query(queryText)
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log(`Error fetching unreviewed grants`, error);
        res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET

//GET grants for a given reviewer --HALEIGH
router.get('/reviewer-grants', (req, res) => {
    console.log(`Fetching grants for user id: ${req.user.id}`)
    if(req.isAuthenticated()) {
        //find current cycle_id
        let queryText1 = `SELECT c.id
                        FROM grant_cycle c
                        WHERE "cycle_complete" = FALSE
                        ORDER by c.start_date;`;
        let cycleID = 0;
        pool.query(queryText1)
        .then(result => {
        cycleID = result.rows[0]
        })
        .catch(error => {
        console.log(`Error fetching current cycle ID for reviewer`, error);
        res.sendStatus(500);
        });
        const userID = req.user.id;
        let queryText2 = `SELECT d.*, s.* 
                        FROM grant_assignments a
                        JOIN grant_data d
                        ON a.grant_id = d.id
                        FULL JOIN scores s
                        ON a.grant_id = s.grant_id
                        WHERE a.reviewer_id = $1
                        AND a.cycle_id = $2`;
        pool.query(queryText2, [userID, cycleID.cycle_id])
        .then(result => {
        res.send(result.rows);
        })
        .catch(error => {
        console.log(`Error fetching grants for user id: ${req.user.id}`, error);
        res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
}); //end GET

//POST to set user as reviewer for grant cycle --HALEIGH
router.post('/userReviewer',  (req, res) => {
    if(req.isAuthenticated()) {
        //find current cycle ID
        let queryText1 = `SELECT c.id
                        FROM grant_cycle c
                        WHERE "cycle_complete" = FALSE
                        ORDER by c.start_date;`;
        let cycleID = 0;
        pool.query(queryText1)
        .then(result => {
        cycleID = result.rows[0]
        })
        .catch(error => {
        console.log(`Error fetching current cycle ID for reviewer`, error);
        res.sendStatus(500);
        });
        let queryText2 = `INSERT INTO "reviewers" ("reviewer_id", "cycle_id", "available_reviews", "dept_id")
        VALUES($1, $2, $3, $4)`;
        let reviewer_id = req.user.id;
        let cycle_id = cycleID.cycle_id;
        let available_reviews = req.body.available_reviews;
        let dept_id = req.user.dept_id;
        pool.query(queryText2, [ reviewer_id, cycle_id, available_reviews, dept_id ])
        .then(result => {
        res.sendStatus(201);
        })
        .catch(error => {
        console.log(`Error setting user as reviewer for grant cycle`, error);
        res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
});//end POST


// PUT to finalize review cycle --RILEY
router.put('/finalizeCycle', (req, res) => {
  
  if (req.isAuthenticated()) {
    console.log(req.body);
    let cycle_name = req.body.cycle_name;
    let queryText = `UPDATE "grant_cycle" 
                    SET "cycle_complete" = TRUE 
                    WHERE "cycle_name" = $1;`;
    pool.query(queryText, [cycle_name])
    .then((result) =>{
        console.log('Success', cycle_name);
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(`Error making query ${queryText}`, err);
        res.sendStatus(500)
    })
  } else {
    res.sendStatus(401);
  }
}
)// end PUT

// PUT to set scores as reviewer --RILEY
router.post('/setScores', (req, res) => {
    if (req.isAuthenticated()) {

        //Get data from request and set to variables
        let grant_id = req.body.grant_id;
        let reviewer_id = req.body.reviewer_id;
        let score_id = null;
        const created_at = req.body.created_at;
        const assigned_by = req.body.assigned_by;
        const interdisciplinary = req.body.interdisciplinary;
        const goals = req.body.goals;
        const method_and_design = req.body.method_and_design;
        const budget = req.body.budget;
        const impact = req.body.impact;
        const review_complete = req.body.review_complete;

        //Check if scores have already been saved for this grant and reviewer combination
        let queryText = `SELECT "id" FROM "scores"
                        WHERE "grant_id" = $1 AND "reviewer_id" = $2;`;

        pool.query(queryText, [grant_id, reviewer_id])
            .then((result) => {
                //If the scores  have been saved update them with the new values
                if (result.rowCount > 0) {
                    score_id = result.rows[0].id;
                    console.log('Score Id:', score_id);
                    queryText = `UPDATE "scores"
                SET "created_at" = $1,
                    "interdisciplinary" = $2,
                    "goals" = $3,
                    "method_and_design" = $4,
                    "budget" = $5,
                    "impact" = $6
                WHERE "id" = $7;`;

                    pool.query(queryText, [created_at, interdisciplinary, goals, method_and_design, budget, impact, score_id])
                        .then((response) => {
                            res.sendStatus(201);
                        }).catch((error) => {
                            console.log(`error making query ${queryText}`, error); //JEFF added error log
                            res.sendStatus(500);
                        });
                } else if (result.rowCount === 0) { //JEFF changed from rowCount to result.rowCount
                    //if these are new scores create a new database line
                    queryText = `INSERT INTO "scores" (
                                "created_at", 
                                "grant_id", 
                                "reviewer_id", 
                                "assigned_by", 
                                "interdisciplinary", 
                                "goals",
                                "method_and_design",
                                "budget",
                                "impact",
                                "review_complete")
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

                    pool.query(queryText, [created_at, grant_id, reviewer_id, assigned_by, interdisciplinary, goals, method_and_design, budget, impact, review_complete]) //JEFF added review_complete
                        .then((response) => {
                            res.sendStatus(201);
                        }).catch((error) => {
                            console.log(`error making query ${queryText}`, error); //JEFF added error log
                            res.sendStatus(500);
                        })
                }
            })
            //Catch from first query
            .catch((err) => {
                console.log(`Error making query ${queryText}`, err);
                res.sendStatus(500)
            });



    } else {
        res.sendStatus(401);
    }
})// end PUT

// PUT to set review as complete --HALEIGH
router.put('/complete/:id', (req, res) => {
    let id = req.params.id;
    console.log('Setting review complete, review id:', id);
    if (req.isAuthenticated()) {
      let queryText = `UPDATE "scores" 
                    SET "review_complete" = TRUE
                    WHERE "id" = $1;`;
      pool.query(queryText, [id])
      .then((result) =>{
          res.sendStatus(200);
      })
      .catch((err) => {
          console.log(`Error setting review complete`, err);
          res.sendStatus(500)
      })
    } else {
      res.sendStatus(401);
    }
})// end PUT


module.exports = router;
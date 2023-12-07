const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const bcrypt = require('bcryptjs');

//GET all grant data
router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        const queryText = `SELECT gd.*, gc.start_date, gc.end_date, gc.grant_type, gc.cycle_name
                        FROM grant_data gd
                        JOIN grant_cycle gc ON gd.cycle_id = gc.id;`;
        console.log('Fetching all grant data')
        pool.query(queryText)
        .then(result => {
            if (result.rows.length > 0) {
                res.send(result.rows);
            } else {
                console.log('No grant data');
                res.sendStatus(200)
            }
        })
        .catch(error => {
            console.log(`Error fetching all grant data`, error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(401)
    }
}); //end GET


// GET all reviewers --HALEIGH
router.get('/reviewers', (req, res) => {
    if(req.isAuthenticated()) {
        let queryText = 'SELECT * from "reviewers";';
        console.log('Fetching all reviewers')
        pool.query(queryText)
        .then(result => {
            if (result.rows.length > 0) {
                res.send(result.rows);
            } else {
                console.log('No reviewers');
                res.sendStatus(200)
            }
        })
        .catch(error => {
            console.log(`Error fetching all reviewers`, error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(401)
    }
}); //end GET


//GET unreviewed grants --HALEIGH in progress **update with department ID field
router.get('/review-progress/:id', (req, res) => {
    console.log('Fetching all unreviewed grants')
    // if(req.isAuthenticated()) {
        let cycle_id = req.params.id
        let queryText = `SELECT * FROM (
                                    SELECT COUNT(DISTINCT a.reviewer_id) as "reviews", d.id, d.cycle_id, d.project_title, d."PI_dept_id"
                                    FROM grant_data d
                                    FULL JOIN grant_assignments a
                                    ON d.id = a.grant_id
                                    WHERE d.cycle_id = $1
                                    GROUP BY d.id ) x
                            WHERE x.reviews <3`;
    pool.query(queryText, [cycle_id])
    .then(result => {
        if (result.rows.length > 0) {
            res.send(result.rows);
        } else {
            console.log('No unreviewed grants');
            res.sendStatus(200)
        }
    })
    .catch(error => {
        console.log(`Error fetching unreviewed grants`, error);
        res.sendStatus(500);
    });
//   } else {
//     res.sendStatus(401);
//   }
}); //end GET

//GET grants for a given reviewer --HALEIGH
router.get('/reviewer-grants/:id', (req, res) => {
    console.log(`Fetching grants for user id: ${req.user.id}`)
    // if(req.isAuthenticated()) {
        const userID = req.user.id;
        const cycle_id = req.params.id
        let queryText = `SELECT d.*, s.review_complete, TO_CHAR(d.time_stamp, 'YYYY-MM-DD') as formatted_date 
                        FROM grant_assignments a
                        JOIN grant_data d
                        ON a.grant_id = d.id
                        LEFT JOIN scores s
                        ON a.grant_id = s.grant_id
                        WHERE a.reviewer_id = $1
                        AND a.cycle_id = $2`;
        pool.query(queryText, [userID, cycle_id])
        .then(result => {
            if (result.rows.length > 0) {
                res.send(result.rows);
                console.log(result.rows, "results")
            } else {
                console.log('No grants for user');
                console.log('cycleID', cycle_id)
                res.send([])
            }
        })
        .catch(error => {
            console.log(`Error fetching grants for user id: ${req.user.id}`, error);
            res.sendStatus(500);
        });
    // } else {
    //     res.sendStatus(401);
    // }
}); //end GET

//GET grants for a given reviewer on reviewerhomepage --JENNY
router.get('/reviewerhomepage', (req, res) => {
    // Fetch relevant data from grant_assignments, grant_data, and departments table
    const userID = req.user.id;
    let queryText = `
                    SELECT TO_CHAR(gd.time_stamp, 'YYYY-MM-DD') as formatted_date,
                    gd.project_title, gd.principal_investigator, gd."PI_primary_college", ga.assigned_at, ga.assigned_by, ga.grant_id, ga.reviewer_id, ga. cycle_id
                    FROM grant_assignments ga
                    JOIN grant_data gd ON ga.grant_id = gd.id
                    WHERE ga.reviewer_id::VARCHAR = $1::VARCHAR;
                    `;       
    pool.query(queryText, [userID])
    .then(result => {
        console.log('result', result);
        res.send(result.rows);

    })
    .catch(error => {
        console.log(`Error fetching grants for user id: ${req.user.id}`, error);
        res.sendStatus(500);
    })
});


//POST to set user as reviewer for grant cycle --HALEIGH
router.post('/userReviewer',  (req, res) => {
    if(req.isAuthenticated()) {
        let queryText = `INSERT INTO "reviewers" ("reviewer_id", "cycle_id", "available_reviews", "dept_id")
        VALUES($1, $2, $3, $4)`;
        let reviewer_id = req.user.id;
        let cycle_id = req.body.cycle_id;
        let available_reviews = req.body.available_reviews;
        let dept_id = req.user.dept_id;
        pool.query(queryText, [ reviewer_id, cycle_id, available_reviews, dept_id ])
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

// POST to set scores as reviewer --RILEY
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
        const comments = req.body.comments; //JEFF added this line
        const review_complete = req.body.review_complete;
        
        //Check if scores have already been saved for this grant and reviewer combination
        let queryText = `SELECT "id" FROM "scores"
                        WHERE "grant_id" = $1 AND "reviewer_id" = $2;`;

        pool.query(queryText, [grant_id, reviewer_id])
            .then((result) => {
                //If the scores have been saved update them with the new values
                if (result.rowCount > 0) {
                    score_id = result.rows[0].id;
                    console.log('Score Id:', score_id);
                    queryText = `UPDATE "scores"
                SET "created_at" = $1,
                    "interdisciplinary" = $2,
                    "goals" = $3,
                    "method_and_design" = $4,
                    "budget" = $5,
                    "impact" = $6,
                    "comments" = $7,
                    "review_complete" = $8
                WHERE "id" = $9;`;

                    pool.query(queryText, [created_at, interdisciplinary, goals, method_and_design, budget, impact, comments, review_complete, score_id])
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
                                "comments",
                                "review_complete")
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;

                    pool.query(queryText, [created_at, grant_id, reviewer_id, assigned_by, interdisciplinary, goals, method_and_design, budget, impact, comments, review_complete]) //JEFF added comments, review_complete
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

//GET grants that need to be assigned --HALEIGH in progress **update with department ID field
router.get('/unassigned/:id', (req, res) => {
    console.log('Fetching all grants to be assigned')
    if(req.isAuthenticated()) {
        let cycle_id = req.params.id
        let queryText = `SELECT * FROM (
                                    SELECT COUNT(DISTINCT a.reviewer_id) as "reviews", d.id, d.cycle_id, d.project_title, d."PI_dept_id"
                                    FROM grant_data d
                                    FULL JOIN grant_assignments a
                                    ON d.id = a.grant_id
                                    WHERE d.cycle_id = $1
                                    GROUP BY d.id ) x
                            WHERE x.reviews <3`;
    pool.query(queryText, [cycle_id])
    .then(result => {
        if (result.rows.length > 0) {
            res.send(result.rows);
        } else {
            console.log('No unassigned grants');
            res.sendStatus(200)
        }
    })
    .catch(error => {
        console.log(`Error fetching unassigned grants`, error);
        res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
}); //end GET




module.exports = router;
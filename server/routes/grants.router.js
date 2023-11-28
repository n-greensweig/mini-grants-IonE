const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


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


//GET unreviewed grants --HALEIGH, need to test with data
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

//GET grants for given reviewer (don't send userID as param, incorrect) --HALEIGH
router.get('/reviewer-grants', (req, res) => {
    console.log(`Fetching grants for user id= ${req.user.id}`)
    if(req.isAuthenticated()) {
        const userID = req.user.id;
        let queryText = `SELECT observations.*, s.scientific_name, s.common_name, s.growth_type
                        FROM "observations" 
                        JOIN species s
                        ON s.id = species_id
                        WHERE "user_id" = $1
                        ORDER by observations.date_observed;`;
        pool.query(queryText, [userID])
        .then(result => {
        res.send(result.rows);
        })
        .catch(error => {
        console.log(`Error fetching users observations`, error);
        res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
}); //end GET


//POST to save grant data (interacts with google sheet) --RILEY
router.post('/',  (req, res) => {
   
    if(req.isAuthenticated()) {
        let queryText = ``;
        pool.query(queryText, [])
        .then(result => {
        res.sendStatus(201);
        })
        .catch(error => {
        console.log(`Error running query ${queryText}`, error);
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
                            console.log(`error making query ${queryText}`);
                            res.sendStatus(500);
                        });
                } else if (rowCount === 0) {
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
                                "impact")
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

                    pool.query(queryText, [created_at, grant_id, reviewer_id, assigned_by, interdisciplinary, goals, method_and_design, budget, impact])
                        .then((response) => {
                            res.sendStatus(201);
                        }).catch((error) => {
                            console.log(`error making query ${queryText}`);
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
router.put('/edit/:id', (req, res) => {
    let id = req.params.id;
    let updatedObservation = req.body;
    console.log('updating observation for id', id);
    if (req.isAuthenticated()) {
      let queryText = `UPDATE "observations" 
                    SET "species_id" = $1, "location" = $2, "photo" = $3,
                    "notes" = $4, "date_observed" = $5, "time_stamp" = $6
                    WHERE "id" = $7;`;
      pool.query(queryText, [updatedObservation.species_id, updatedObservation.location, updatedObservation.photo, 
                            updatedObservation.notes, updatedObservation.date_observed, updatedObservation.time_stamp, id])
      .then((result) =>{
          res.sendStatus(200);
      })
      .catch((err) => {
          console.log(`Error making query ${queryText}`, err);
          res.sendStatus(500)
      })
    } else {
      res.sendStatus(401);
    }
})// end PUT


module.exports = router;
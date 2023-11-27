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
        let queryText1 = `SELECT c.id
                        FROM grant_cycle c
                        WHERE "cycle_complete" = FALSE
                        ORDER by c.start_date;`;
        let cycleID = 0;
        pool.query(queryText1, [userID])
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
        pool.query(queryText2, [userID, cycleID])
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


//POST to save grant data (interacts with google sheet) --RILEY
router.post('/',  (req, res) => {
    let newObservation = req.body;
    console.log(`Adding observation`, newObservation);
    if(req.isAuthenticated()) {
        let queryText = `INSERT INTO "observations" ("user_id", "species_id", "location", "photo", "notes", "date_observed", "time_stamp")
        VALUES ($1, $2, $3, $4, $5, $6, $7);`;
        pool.query(queryText, [newObservation.user_id, newObservation.species, newObservation.location, newObservation.photo, newObservation.notes, newObservation.date_observed, newObservation.time_stamp])
        .then(result => {
        res.sendStatus(201);
        })
        .catch(error => {
        console.log(`Error adding new observation`, error);
        res.sendStatus(500);
        });
    } else {
        res.sendStatus(401);
    }
});//end POST


// PUT to complete review cycle --RILEY
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

// PUT to set scores as reviewer --RILEY
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
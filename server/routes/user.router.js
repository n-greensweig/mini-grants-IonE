const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});


//GET current cycle ID --HALEIGH
router.get('/currentCycle', (req, res) => {
  console.log(`Fetching current grant cycle ID`)
  // if(req.isAuthenticated()) {
      //find current cycle_id
      let queryText1 = `SELECT * FROM grant_cycle c
                      WHERE "cycle_complete" = FALSE
                      ORDER by c.start_date;`;
      pool.query(queryText1)
      .then(result => {
        if (result.rows.length > 1) {
          res.send(result.rows[0]);
          console.log(result.rows[0], "result")
        } else {
          res.sendStatus(200)
          console.log("No cycles in DB. Run dataGen route")
        }
      })
      .catch(error => {
        console.log(`Error fetching current grant cycle ID`, error);
        res.sendStatus(500);
      });
  // } else {
  //     res.sendStatus(401);
  // }
}); //end GET


//Searches the database for the correct cycle ID 
router.get ('/getCycle', async (req, res) => {
  console.log(`Fetching current grant cycle info`)
  // if(req.isAuthenticated()) {
      const connection = await pool.connect();
      let date = new Date().toJSON().slice(0,10)
    try {

      const queryString = {
        query: `SELECT "id" FROM "grant_cycle" WHERE $1 BETWEEN "start_date" AND "end_date";`,
        values: [date]
      };

      const queryString2 = {
        query: `SELECT "id" FROM "grant_cycle" WHERE $1 <= "start_date"";`,
        values: [date]
      };

      const result = await connection.query(queryString.query, queryString.values)
      if (result.rows.length !== 0) {
        res.send(result.rows[0]);
      } else {
        const result2 = await connection.query(queryString2.query, queryString2.values)
        res.send(result.rows[0]);
      } 
    } catch (error) {
        console.error('get grant cycle error:', err)
        res.sendStatus(500);
    }
// } else {
  //     res.sendStatus(401);
  // }
})

module.exports = router;

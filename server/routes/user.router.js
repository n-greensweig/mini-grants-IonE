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

//Searches the database for the correct cycle ID 
router.get ('/currentCycle', async (req, res) => {
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
        query: `SELECT * FROM "grant_cycle" WHERE $1 >= "end_date"
                ORDER BY start_date DESC;`,
        values: [date]
      };

      const result = await connection.query(queryString.query, queryString.values)
      if (result.rows.length !== 0) {
        res.send(result.rows[0]);
      } else {
        const result2 = await connection.query(queryString2.query, queryString2.values)
          if (result2.rows.length !== 0) {
              res.send(result2.rows[0]);
          } else {
            console.log('check grant_cycles table in DB, might need to run dataGen route')
            res.sendStatus(200)
          }
      } 
    } catch (error) {
        console.error('get grant cycle error:', error)
        res.sendStatus(500);
    }
// } else {
  //     res.sendStatus(401);
  // }
})

module.exports = router;

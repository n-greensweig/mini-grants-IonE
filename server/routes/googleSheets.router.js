const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const pool = require('../modules/pool');
const { isDateBetween}  = require('../modules/utilityFunctions');

// Google Sheets API credentials and spreadsheet ID
const credentials = require('../../planar-granite-405621-bc999e6010f6.json'); // Path to your Google Cloud credentials file
const spreadsheetId = '1QiPxCZr7QombeEMQA4JhXyHLuOt6C3IrCct1-knVQnI';

let start_col = 'A';
let start_row = '1';
let end_col = 'CA';
let end_row = '5';

const range = `Application Sheet Example!${start_col}${start_row}:${end_col}${end_row}`; // Change this to your desired range

// Google Sheets API authorization
const authorize = async () => {
  const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  await client.authorize();
  return client;
};

const checkDate = (date) => {
    if (isDateBetween(grantCycle.rows[i].start_date, grantCycle.rows[i].end_date, date)) {
      return grantCycle.rows[i].cycle_name;
    
  }
}

function parseArray(nestedArray) {
  const keys = nestedArray[0].map(key => key.toLowerCase().replace(/\s/g, '_')); // Convert to lowercase and replace spaces with underscores in keys
  const result = [];

  for (let i = 1; i < nestedArray.length; i++) {
    const obj = {};

    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = nestedArray[i][j]; // Assign values to sanitized keys
    }

    result.push(obj);
  }

  return result;
}

// Read data from Google Sheets
const getDataFromGoogleSheet = async () => {
  const auth = await authorize();
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    // return response.data.values;

    // console.log(response.data.values[0].length);
    // console.log(response.data.values[1].length);
    let grantData = parseArray(response.data.values);
    console.log(grantData);


  //   const dataObj = {
  //     cycle_id: req.body.cycle_id,
  //     time_stamp: Date.now(),
  //     dept_id: req.body.dept_id, //Array
  //     applicant_name: req.body.applicant_name,
  //     applicant_email: req.body.applicant_email,
  //     abstract: req.body.abstract,
  //     proposal_narrative: req.body.proposal_narrative,
  //     project_title: req.body.project_title,
  //     principal_investigator: req.body.principal_investigator,
  //     letter_of_support: req.body.letter_of_support, //URL link
  //     PI_email: req.body.PI_email,
  //     PI_employee_id: bcrypt.hashSync(req.body.PI_employee_id, salt), //employee ID will be salted
  //     PI_primary_college: req.body.PI_primary_college,
  //     PI_primary_campus: req.body.PI_primary_campus,
  //     PI_dept_accountant_name: req.body.PI_dept_accountant_name,
  //     PI_dept_accountant_email: req.body.PI_dept_accountant_email,
  //     additional_team_members: req.body.additional_team_members,
  //     funding_type: req.body.funding_type,
  //     budget_items: req.body.budget_items,
  //     new_endeavor: req.body.new_endeavor,
  //     heard_from_reference: req.body.heard_from_reference,
  //     total_requested_budget: req.body.total_requested_budget
  // }

    



  } catch (err) {
    console.error('The API returned an error:', err);
    return null;
  }
};

// Save data to PostgreSQL
const saveDataToPostgres = async (pgClient) => {
  const data = await getDataFromGoogleSheet();
  if (!data) return;

  const query = 'INSERT INTO your_table_name (column1, column2, column3, column4) VALUES ($1, $2, $3, $4)';

  data.forEach(async row => {
    try {
      await pgClient.query(query, row);
      console.log('Data inserted:', row);
    } catch (err) {
      console.error('Error inserting data:', err);
    }
  });
};

// Route to trigger the data saving process
router.get('/save-to-postgres', async (req, res) => {
  // if(req.isAuthenticated()) {
  const pgClient = req.app.get('pgClient');
  await saveDataToPostgres(pgClient);
  res.send('Data saved to PostgreSQL!');
  // } else {
  //   res.sendStatus(401);
  // }
});

module.exports = router;

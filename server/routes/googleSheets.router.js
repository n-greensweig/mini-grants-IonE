const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
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
  const keys = nestedArray[0].map(key =>
    key.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s/g, '_')
  );
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

    // console.log(response.data.values[0]);
    // console.log(response.data.values[1].length);
    let grantData = parseArray(response.data.values);
    console.log(response.data.values[2][19]);
    console.log(response.data.values[2][24]);

    console.log(Object.keys(grantData[0]));
    console.log(grantData[1]);
    const salt = bcrypt.genSaltSync(10);

    let i = 0;
    const dataObj = {
      cycle_id: '', //Todo
      time_stamp: grantData[i].time_stamp,
      applicant_name: grantData[i].applicant_name,
      applicant_email: grantData[i].applicant_email,
      abstract: grantData[i].abstract,
      proposal_narrative: grantData[i].proposal_narrative,
      project_title: grantData[i].project_title,
      principal_investigator: grantData[i].principal_investigator,
      letter_of_support: grantData[i].letter_of_support, //URL link
      PI_email: grantData[i].PI_email,
      PI_employee_id: bcrypt.hashSync(grantData[i].pi_7digit_umn_employee_id_number, salt), //employee ID will be salted
      PI_primary_college: grantData[i].PI_primary_college,
      PI_primary_campus: grantData[i].PI_primary_college,
      PI_dept_accountant_name: grantData[i].PI_dept_accountant_name,
      PI_dept_accountant_email: grantData[i].PI_dept_accountant_email,
      additional_team_members: '', //To Do - must be parsed into JSON data
      funding_type: grantData[i].funding_type,
      period_of_performance: grantData[i].period_of_performance,
      budget_items: grantData[i].budget_items,
      new_endeavor: grantData[i].new_endeavor,
      heard_from_reference: grantData[i].heard_from_reference,
      total_requested_budget: grantData[i].total_requested_budget
  }

    



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

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


async function getCycleName(date) {
  const client = await pool.connect();
try {

  const queryString = {
    query: `SELECT "id" FROM "grant_cycle" WHERE $1 BETWEEN "start_date" AND "end_date";`,
    values: [date]
  };

  const result = await client.query(queryString.query, queryString.values)
  if (result.rows.length > 0) {
    return result.rows[0].id;
  } else {
    return 'N/A';
  } 
} catch (error) {
  console.error(`Error running query`, error);
} finally {
  client.release();
}
}

function parseArray(nestedArray) {
  const keys = nestedArray[0].map(key =>
    key.toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s/g, '_')
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

function parseDateString(dateString) {
  const [month, day, year, hours, minutes, seconds] = dateString.split(/[/ :]/);
  // Months are 0-based in JavaScript Date, so subtract 1 from the month
  return new Date(year, month - 1, day, hours, minutes, seconds);
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
  
    let grantData = parseArray(response.data.values);
    const headers = Object.keys(grantData[0]);
    const salt = bcrypt.genSaltSync(10);

    let i = 0;
    
    const cycleName = await getCycleName(parseDateString(grantData[i][headers[0]]));
    

    const dataObj = {
      cycle_id: cycleName,
      time_stamp: parseDateString(grantData[i][headers[0]]),
      applicant_name: grantData[i][headers[1]],
      applicant_email: grantData[i][headers[15]],
      abstract: grantData[i][headers[2]],
      proposal_narrative: grantData[i][headers[3]],
      project_title: grantData[i][headers[4]],
      principal_investigator: grantData[i][headers[5]],
      letter_of_support: grantData[i][headers[6]], //URL link
      PI_email: grantData[i][headers[7]],
      PI_employee_id: bcrypt.hashSync(grantData[i][headers[8]], salt), //employee ID will be salted
      PI_dept_id: grantData[i][headers[9]],
      PI_primary_college: grantData[i][headers[10]],
      PI_primary_campus: grantData[i][headers[29]],
      PI_dept_accountant_name: grantData[i][headers[12]],
      PI_dept_accountant_email:grantData[i][headers[13]],
      additional_team_members: '', //To Do - must be parsed into JSON data
      funding_type: grantData[i][headers[20]],
      UMN_campus_or_center: grantData[i][headers[21]],
      period_of_performance: grantData[i][headers[22]],
      budget_items: grantData[i][headers[23]],
      new_endeavor: grantData[i][headers[26]],
      heard_from_reference: grantData[i][headers[27]],
      total_requested_budget: grantData[i][headers[28]]
  }
  console.log(dataObj);

  // 14'please_provide_this_individuals_first_and_last_name',
  // 15'email_address',
  // 16'role_external_adviser_undergraduate_student_graduate_student_etc',
  // 17'department__unit__organization',
  // 18'do_you_have_other_team_members_left_to_add',
  // 19'please_send_the_name_email_address_project_role_and_department_or_organization_of_any_additional_project_team_members_to_at_ionemgumnedu_if_you_have_additional_team_members_to_add_to_your_proposal_no_response_needed_below',

  // console.log(dataObj);
    

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

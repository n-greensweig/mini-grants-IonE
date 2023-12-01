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
let start_row = '2';
let end_col = 'CA';
let end_row = '30';

const globalRange = `Application Sheet Example!${start_col}${start_row}:${end_col}${end_row}`; // Change this to your desired range

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

//Searches the database for the correct cycle ID and applies it to imported grant data
//Based on the time of the submitted grant application
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

//Parses the header data by removing spaces and special characters so they can be placed into a
//javascript object
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

function parseNewProject(string) {
  if (string === 'This is a new project.') return true
  else return false;
}

function convertCurrencyStringToInt(currencyString) {
  // Remove commas and dollar sign, then parse the float value
  const value = parseFloat(currencyString.replace(/[$,]/g, ''));

  // Convert the float value to an integer
  const intValue = Math.round(value * 100); // Multiplying by 100 to convert dollars to cents

  return value;
}

function parseTeamMembers(dataArr) {
  let teamsArr = dataArr.slice(14, 68);
  let teamsObj = [];  

  for (let i = 0; i < teamsArr.length; i += 5) {
    teamsObj.push([{
      team_member: teamsArr[i],
      email: teamsArr[i+1],
      role: teamsArr[i+2],
      dept: teamsArr[i+3]
    }]);
  }; //end for loop
  // console.log(teamsObj);
  return teamsObj;
  
}

// Read data from Google Sheets
const getDataFromGoogleSheet = async (sheetId, tabName, start_col, start_row, end_col, end_row) => {

const range = `${tabName}!${start_col}${start_row}:${end_col}${end_row}`;
  const auth = await authorize();
  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      sheetId,
      range,
    });
  
    let grantData = response.data.values;
    // const headers = Object.keys(grantData[0]);
    const salt = bcrypt.genSaltSync(10);
    // console.log(grantData[1]);
    let dataObj = [];

    for (let i = 1; i < grantData.length; i++) {
      const cycleName = await getCycleName(parseDateString(grantData[i][0]));
    const singleLineData = [
      cycleName, //cycle_id
      parseDateString(grantData[i][0]), //time_stamp
      grantData[i][1], //applicant_name
      grantData[i][74], //applicant_email
      grantData[i][2], //abstract
      grantData[i][3], //proposal_narrative
      grantData[i][4], //project_title
      grantData[i][5], //principal_investigator
      grantData[i][6], //letter_of_support
      grantData[i][7], //PI_email
      bcrypt.hashSync(grantData[i][8], salt), //PI_employee_id - salted
      grantData[i][9], //PI_dept_id
      grantData[i][10], //PI_primary_college
      grantData[i][29], //PI_primary_campus
      grantData[i][12], //PI_dept_accountant_name
      grantData[i][13], //PI_dept_accountant_email
      JSON.stringify(parseTeamMembers(grantData[i])), //additional_team_members - To Do - must be parsed into JSON data
      grantData[i][69], //funding_type
      grantData[i][70], //UMN_campus_or_center
      grantData[i][71], //period_of_performance
      grantData[i][72], //budget_items
      parseNewProject(grantData[i][75]), //new_endeavor
      grantData[i][76], //heard_from_reference
      convertCurrencyStringToInt(grantData[i][77]) //total_requested_budget
    ]

    dataObj.push(singleLineData);
    
    } //End for loop
    return dataObj;
  } catch (err) {
    console.error('The API returned an error:', err);
    return null;
  }
};

// Save data to PostgreSQL
const saveDataToPostgres = async (sheetId, tabName, start_col, start_row, end_col, end_row) => {
  const data = await getDataFromGoogleSheet(sheetId, tabName, start_col, start_row, end_col, end_row);
  // console.log(typeof data, data.length, data[0].length);
  if (!data) return;

  for (let i = 0; i < data.length; i++) {
    try {
    
      const isDuplicateQuery = {
        text: `SELECT checkDuplicateEntry($1, $2) AS is_duplicate`,
          values: [data[i][6], data[i][0]]
      };
      const { rows } = await pool.query(isDuplicateQuery.text, isDuplicateQuery.values);
      
      const isDuplicate = rows[0].is_duplicate;
      // console.log('IsDuplicate', isDuplicate);

      if (!isDuplicate) {

        const insertQuery = `
        INSERT INTO "grant_data" (
          "cycle_id", "time_stamp", "applicant_name", "applicant_email", "abstract", 
         "proposal_narrative", "project_title", "principal_investigator", "letter_of_support", 
          "PI_email", "PI_employee_id", "PI_dept_id", "PI_primary_college", "PI_primary_campus", 
          "PI_dept_accountant_name", "PI_dept_accountant_email", "additional_team_members", 
         "funding_type", "UMN_campus_or_center", "period_of_performance", "budget_items", 
         "new_endeavor", "heard_from_reference", "total_requested_budget")

      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, 
              $16, $17, $18, $19, $20, $21, $22, $23, $24);`;
      
        await pool.query(insertQuery, data[i]);
        console.log('Data inserted:');
      } else {
        console.log('Skipping duplicate entry');
      } //end if isDuplicate()
    } //end try
    catch(error) {
      console.error('Error inserting data:', error);
    }
  } //end for loop
};

// Route to trigger the data saving process
router.get('/importFromGoogle', async (req, res) => {
  // if(req.isAuthenticated()) {
  await saveDataToPostgres(req.body.sheetId, req.body.tabName, req.body.start_col, req.body.start_row, req.body.end_col, req.body.end_row);
  res.send('Data saved to PostgreSQL!');
  // } else {
  //   res.sendStatus(401);
  // }
});

module.exports = router;

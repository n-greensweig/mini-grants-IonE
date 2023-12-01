# University of Minnesota 
## Institute on the Enviormment
## Mini-Grants Web Application

  This application streamlines the Insitute on the Enviornment's grant submission, academic review and grant award processes. It will serve as the

# Initialization and Deployment

## Generating Grant Cycle Data

  The application will automatically generate the opening and closing dates for the biannual mini-grant cycles
  from 2015 to 2050. This process should only be invoked on initial deployment of the database. After logging in proceed to the Admin page and click the "Generate Grant Cycles" button. **This should only be done once**. 

### Importing Data from Google Sheets

  #### Importing grant data from a Google spreadsheet will require several pieces of information:

  1) Google Sheets API credentials: To obtain credentials go to the Google Cloud Console[https://console.cloud.google.com]. Click on APIs * Services -> Enable APIs and Services. Search for "Google Sheets API" and enable it.
  2) On the Google Cloud Console click on "Credentials" then click "Create Credentails" and select "Service Account" in the drop down menu. 
  3) Create a service name, enter a service count ID and email and create the credentials.
  4) Once the credentials have been created click on "Keys" -> "Add Keys" -> "Create New Key". Select "JSON" and create the key. 
  5) Creating the key will download a .JSON file. This file contains the authorizations for the Google Sheets API and must be copied into the main application folder. 

  #### Sharing the spreadsheet to the application

  In order for the application to import the data the spreadsheet must be shared with the correct 
  email address. On the Google Cloud Console[https://console.cloud.google.com] click on the Service Account created in the previous steps. Copy the email address. Then in the Google Sheet click "Share" and add the email address (read access is sufficient). 

  #### Importing the data
  
  Obtain the spreadsheet ID from the URL in your browser's address bar. The spreadsheet ID is the long string of characters between /d/ and /edit in the URL. Example: 1QOxCZr7Q3mbeEMQV4JhXpDLnOt6O3IrPct1-5nVQxI

  On the Admin page of the IonE Mini-Grants application select "Import Data From Google Spreadsheet". Provide the spreadsheet ID and the start and end rows and columns. **Note: Do not include the header row (Row 1)**. 
  **Example: A2 to K20.**. Then provide the name of the tab that contains the data you wish to import. 

  **Important** The order of columns in the google sheet cannot be changed and must match the format set by the current Google form submission. Any modification of the column order will result in data being placed erroneously in the database and will need to be fixed manually. 


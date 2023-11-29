# Steps to Obtain Google API Credentials:
### Credentials are needed in order for the application to import the grant data from Google Sheets

## 1 - Go to the Google Cloud Console:
    Visit the [Google Cloud Console](https://console.cloud.google.com/) and log in using your Google account.

## 2 - Create a New Project:
    If you don't have a project already, create a new one. Select the project or create a new project by clicking on the project drop-down menu at the top left corner.
## 3 - Enable Google Sheets API:
    Navigate to the APIs & Services → Library and search for "Google Sheets API." Enable it for your project.
## 4 - Create Service Account Key:
    Go to APIs & Services → Credentials.
    Click "Create credentials" and select "Service account key."
    Create a new service account or select an existing one.
    Choose the role for the service account (e.g., Project → Editor).
    For the key type, select JSON and click "Create." This will download a JSON file containing your credentials.
## 5 - Store and Use Credentials Safely:
    Store the downloaded JSON file securely and ensure it's not accessible to unauthorized users.
    Use the credentials securely in your application. You can load the JSON file in your Node.js application to authenticate with Google services.
## 6- Grant Access to Google Sheets:
    Share the Google Sheet with the service account email address (client_email in the downloaded JSON file) to allow access.
## 7 - Environment Setup:
    In your Node.js application, refer to this JSON file to set up the credentials for accessing Google Sheets API.

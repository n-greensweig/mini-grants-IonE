import { useState } from "react";
import axios from "axios";
import { Typography, TextField } from "@mui/material";
import TipWindow from "../TipWindow/TipWindow";

import './importGoogleSheet.css';
import { Button } from "@mui/base";

function ImportGoogleSheet() {
    const [sheetURL, setSheetURL] = useState('');
    const [tabName, setTabName] = useState('');
    const [start_col, setStart_col] = useState('');
    const [start_row, setStart_row] = useState('');
    const [end_col, setEnd_col] = useState('');
    const [end_row, setEnd_row] = useState('');
    const [error, setError] = useState('');

    function extractGoogleSheetId(googleSheetsUrl) {
        const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)\//;
        const match = googleSheetsUrl.match(regex);
      
        if (match && match[1]) {
          return match[1]; // Return the extracted document ID
        } else {
          return null; // Return null if no document ID found in the URL
        }
      }


    const runImport = () => {
        setError('');
        if (!sheetURL) { return setError('Please enter spreadsheet URL')} 
        if (!tabName) return setError('Please Enter the tab name');
        if (!start_col || !end_col) return setError('Please enter column information');
        if (!start_row || !end_row) return setError('Please enter row information');
        const sheetId = extractGoogleSheetId(sheetURL);

    const dataObj = {
        sheetId: sheetId,
        tabName: tabName,
        start_col: start_col,
        start_row: start_row,
        end_col: end_col,
        end_row: end_row
    }

        axios.post('/googleSheets/importFromGoogle', dataObj)
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <div className="importContainer">
            <div className="importTitle">
                <Typography id="googleImport" variant="h5">Import Grant Data from Google</Typography>
            </div>
            <div className="importIn">
                <TipWindow
                    data={"Open the google spreadheet to be imported, click on share and then copy link. For additional help: https://support.google.com/drive/answer/2494822?hl=en"}>
                    <Typography variant="body">Enter the URL or ID of the spreadsheet</Typography>
                </TipWindow>
            </div>
            <div className="sheetId">
                <TextField
                    sx={{ p: '5px' }}
                    id="spreadSheetLink" label="Google Sheet URL" variant="outlined" value={sheetURL}
                    onChange={(e) => setSheetURL(e.target.value)} />

                <TextField sx={{ p: '5px' }} label="Tab Name" variant="outlined" value={tabName}
                onChange={(e) => setTabName(e.target.value)} />
            </div>

            <div className="importRange">
                <TextField sx={{ p: '5px' }}
                    label="Start Col" variant="outlined" value={start_col}
                    onChange={(e) => { setStart_col(e.target.value) }} />

                <TextField
                sx={{ p: '5px' }}
                    label="Start Row"
                    type="number"
                    variant="outlined"
                    value={start_row} 
                    onChange={(e) => setStart_row(e.target.value)} 
                />

                <TextField
                    sx={{ p: '5px' }}
                    label="End Col" variant="outlined" value={end_col}
                    onChange={(e) => { setEnd_col(e.target.value) }} />

                <TextField
                    sx={{ p: '5px' }}
                    label="End Row"
                    type="number"
                    variant="outlined"
                    value={end_row} 
                    onChange={(e) => setEnd_row(e.target.value)} 
                />
            </div>
        
        <Button variant="contained" onClick={runImport}>Import</Button>
        {error &&
            <>
            <br/>
            <Typography variant="body" sx={{ color: 'red'}}>{error}</Typography>
            </>
        }
        </div>
    )
}

export default ImportGoogleSheet;
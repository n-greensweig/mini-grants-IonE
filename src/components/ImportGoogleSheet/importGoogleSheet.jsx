import { useState } from "react";
import axios from "axios";
import { Typography, TextField, Button, Modal, Container } from "@mui/material";
import TipWindow from "../TipWindow/TipWindow";

import './importGoogleSheet.css';
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';

function ImportGoogleSheet() {
    const [sheetURL, setSheetURL] = useState('https://docs.google.com/spreadsheets/d/1QiPxCZr7QombeEMQA4JhXyHLuOt6C3IrCct1-knVQnI/edit?usp=sharing');
    const [tabName, setTabName] = useState('Application Sheet Example');
    const [start_col, setStart_col] = useState('A');
    const [start_row, setStart_row] = useState('2');
    const [end_col, setEnd_col] = useState('CA');
    const [end_row, setEnd_row] = useState('50');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [importData, setImportData] = useState({});
    const [modalOpen, setModalOpen] = useState(false);

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
        if (!start_row || !end_row || start_row < 2 || end_row < 2) return setError('Please enter row information');
        if (start_row == 1) { setStart_row('2'); return setError('The column header row(row 1) should not be included');
    } else {
        setLoading(true);
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
            if (response.data.error) {
                setLoading(false);
                if (response.data.error == 'Requested entity was not found.') {
                    setError('Spreadsheet not found. Check the URL and ensure the sheet is shared with the API. Check the readme for additional information');
                } else if (response.data.error.slice(0, 21) === 'Unable to parse range') { setError('Check that the tab name in your spreadsheet matches what was entered, including spaces');
            } else {
                setError(response.data.error);
            }
                
            } else {
            setImportData({imported: response.data.importedRecords, skipped: response.data.skippedRecords, records: response.data.sheetData.length })
            setLoading(false);
            setModalOpen(true);
            }
        }).catch((error) => {
            console.log(error);
            // setError(error.error.errors);
            setLoading(false);
        })
    }
    }

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

    return (
        <Container maxWidth="md">
            {loading && 
                <div className="loader">
                    <center>
                <CircleLoader override={override} color={'#e01616'} loading={loading} size={250} />
                </center>
                </div>
            }
            {importData.records >= 1 && 
             <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
             <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
              
                 <>
                   <Typography variant="h6">Import Successful</Typography><br />
                   <Typography variant="body">Total Records Found: {importData.records}</Typography><br />
                   <Typography variant="body">Records Imported: {importData.imported}</Typography><br />
                   <Typography variant="body">Duplicate Records Skipped: {importData.skipped}</Typography><br />
                 </>
             </div>
           </Modal>
            }

            {!loading && 
            <>
            <div className="importTitle">
                <Typography id="googleImport" variant="h5">Import Grant Data from Google</Typography>
            </div>
            <div className="importIn">
                <TipWindow
                    data={"Open the google spreadheet to be imported, click on share and then copy link. For additional help: https://support.google.com/drive/answer/2494822?hl=en"}>
                    <Typography variant="body">Enter the URL of the spreadsheet</Typography>
                </TipWindow>
            </div>
            <div className="sheetId">
                <TextField
                    sx={{ p: '5px' }}
                    id="spreadSheetLink" label="Google Sheet URL" fullWidth variant="outlined" value={sheetURL}
                    onChange={(e) => setSheetURL(e.target.value)} />
            </div>
            <div className="sheetId">
                <TextField sx={{ p: '5px' }} label="Tab Name" fullWidth variant="outlined" value={tabName}
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
        <div className="error">
        {error &&
            <>
            <br/>
            <Typography variant="body" sx={{ color: 'red'}}>{error}</Typography>
            </>
        }
        </div>
        </>
    }
        </Container>
    )
}

export default ImportGoogleSheet;
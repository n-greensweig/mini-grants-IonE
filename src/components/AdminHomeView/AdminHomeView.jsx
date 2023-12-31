import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button } from '@mui/material';
import { useSelector } from 'react-redux'
import axios from 'axios';
import { PDFDownloadLink } from '@react-pdf/renderer';

// child components
import PDFDocument from '../PDF/PDFDocument';

const AdminHomeView = () => {
  const [grants, setGrants] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [statusOptions] = useState(['Unassigned', 'InReview', 'Complete']);
  const user = useSelector((store) => store.user.userReducer);
  const cycleId = useSelector((store) => store.user.currentCycle);

  useEffect(() => {
    axios.get('/grants')
      .then(response => {
        setGrants(response.data);
      })
      .catch(error => {
        console.error('Error fetching grants', error);
      });
      console.log(cycleId.id);
    axios.get(`/grants/reviewers/${cycleId.id-1}`)
      .then(response => {
        console.log('Reviewers response', response.data);
        setReviewers(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviewers', error);
      });
  }, []);

  const handleReviewerChange = (grantId, reviewerNum, newReviewerId) => {
    const updatedGrants = grants.map(grant => {
      if (grant.id === grantId) {
        return { ...grant, [`reviewer_${reviewerNum}`]: newReviewerId };
      }
      return grant;
    });
    setGrants(updatedGrants);
    console.log(newReviewerId);

    const dataObj = {
      assigned_at: new Date(), 
      assigned_by: user.id, 
      grant_id: grantId,
      reviewer_id: newReviewerId,
      cycle_id: cycleId.id-1
  };

  axios.post('/reviewer/assignReviewer', dataObj)
.then(response => {
    console.log('Reviewer assignment updated successfully');
})
.catch(error => {
    console.error('Error updating reviewer assignment', error);
});

  };





  const rowStyle = {
    borderBottom: '1.5px solid black', 
  };

  const viewButtonStyle = {
    backgroundColor: '#ffcc33', 
    color: '#7a0019', 
    '&:hover': {
      backgroundColor: '#e6b800', 
    },
  };


  return (
    <TableContainer component={Paper} style={{ backgroundColor: '#D5D6D2' }}>
      <Table aria-label="grants table">
        <TableHead>
          <TableRow style={rowStyle}>
            <TableCell>Grant ID</TableCell>
            <TableCell>Applicant Name</TableCell>
            <TableCell>Applicant Email</TableCell>
            <TableCell>Project Title</TableCell>
            <TableCell>Reviewer 1</TableCell>
            <TableCell>Reviewer 2</TableCell>
            <TableCell>Reviewer 3</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {grants.map((grant) => (
            <TableRow key={grant.id} style={rowStyle}>
              <TableCell>{grant.id}</TableCell>
              <TableCell>{grant.applicant_name}</TableCell>
              <TableCell>{grant.applicant_email}</TableCell>
              <TableCell>{grant.project_title}</TableCell>
              {[1, 2, 3].map(num => (
                <TableCell key={num}>
                <Select
                  value={grant[`reviewer_${num}`] || ''}
                  displayEmpty
                  onChange={(event) => handleReviewerChange(grant.id, num, event.target.value)}
                >
                  <MenuItem value="" disabled>
                    {`Reviewer ${num}`}
                  </MenuItem>
                  {reviewers.length > 0 &&
                  
                  reviewers?.map((reviewer) => (
                    <MenuItem key={reviewer.id} value={reviewer.reviewer_id}>
                      {reviewer.full_name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              ))}
              <TableCell>
                <Button  onClick={() => {/* handle view click */}}>
                  <h4 id="download">
                    <PDFDownloadLink document={<PDFDocument grantInfo={grant}/>} fileName="Replace.pdf">
                            {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download Grant PDF'
                            }
                    </PDFDownloadLink>
                  </h4>                
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminHomeView;
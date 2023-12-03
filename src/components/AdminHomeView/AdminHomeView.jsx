import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios';

const AdminHomeView = () => {
  const [grants, setGrants] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [statusOptions] = useState(['Complete', 'Assigned', 'In Progress']);

  useEffect(() => {
    axios.get('/grants')
      .then(response => {
        setGrants(response.data);
      })
      .catch(error => {
        console.error('Error fetching grants', error);
      });

    axios.get('/grants/reviewers')
      .then(response => {
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
            <TableCell>Status</TableCell>
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
                  {reviewers.map((reviewer) => (
                    <MenuItem key={reviewer.id} value={reviewer.id}>
                      {reviewer.name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              ))}
              <TableCell>
                <Select
                  value={grant.status}
                  onChange={(event) => {/* handle status change */}}
                >
                  {statusOptions.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Button variant="contained" style={viewButtonStyle} onClick={() => {/* handle view click */}}>
                  View
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

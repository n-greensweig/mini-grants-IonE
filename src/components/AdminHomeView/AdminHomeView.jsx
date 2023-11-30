import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, Button } from '@mui/material';

const AdminHomeView = () => {
  // Sample test data for grants
  const [grants, setGrants] = useState([
    {
      id: 1,
      applicant_name: 'John Doe',
      applicant_email: 'john@example.com',
      project_title: 'Renewable Energy Research',
      reviewer_1: 2,
      reviewer_2: 3,
      reviewer_3: 1,
      status: 'Assigned'
    },
    
  ]);

  // Sample test data for reviewers
  const [reviewers, setReviewers] = useState([
    { id: 1, name: 'Reviewer A' },
    { id: 2, name: 'Reviewer B' },
    { id: 3, name: 'Reviewer C' },
    
  ]);

  const [statusOptions] = useState(['Complete', 'Assigned', 'In Progress']);

  // Replace the following with actual data fetching logic
  // useEffect(() => { ... }, []);

  return (
    <TableContainer component={Paper} style={{ backgroundColor: '#D5D6D2' }}>
      <Table aria-label="grants table">
        <TableHead>
          <TableRow>
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
            <TableRow key={grant.id}>
              <TableCell>{grant.id}</TableCell>
              <TableCell>{grant.applicant_name}</TableCell>
              <TableCell>{grant.applicant_email}</TableCell>
              <TableCell>{grant.project_title}</TableCell>
              {[1, 2, 3].map(num => (
                <TableCell key={num}>
                  <Select
                    value={grant[`reviewer_${num}`]}
                    onChange={(event) => {/* handle reviewer change */}}
                  >
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
                <Button variant="contained" color="primary" onClick={() => {/* handle view click */}}>
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

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';

const GrantsTable = () => {
    const [grants, setGrants] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'cycle_id', direction: 'asc' });

    useEffect(() => {
        axios.get('/grants')
            .then(response => {
              console.log("DB response", response.data);
                setGrants(response.data);
            })
            .catch(error => {
                console.error('Error fetching grants', error);
            });
    }, []);

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedGrants = React.useMemo(() => {
        let sortableItems = [...grants];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [grants, sortConfig]);

    return (
        <TableContainer component={Paper} style={{ backgroundColor: '#D5D6D2' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Button onClick={() => requestSort('cycle_id')}>Cycle ID</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => requestSort('cycle_name')}>Cycle ID</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => requestSort('grant_type')}>Grant Type</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => requestSort('PI_dept_id')}>PI Dept ID</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => requestSort('start_date')}>Start Date</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => requestSort('end_date')}>End Date</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => requestSort('project_title')}>Project Title</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => requestSort('principal_investigator')}>Principal Investigator</Button>
                        </TableCell>
                        <TableCell>
                            <Button onClick={() => requestSort('total_requested_budget')}>Total Requested Budget</Button>
                        </TableCell>
                        {/* Add more sort buttons for each field */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedGrants.map(grant => (
                        <TableRow key={grant.id}>
                            <TableCell>{grant.cycle_id}</TableCell>
                            <TableCell>{grant.cycle_name}</TableCell>
                            <TableCell>{grant.grant_type}</TableCell>
                            <TableCell>{grant.PI_dept_id}</TableCell>
                            <TableCell>{new Date(grant.start_date).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(grant.end_date).toLocaleDateString()}</TableCell>
                            <TableCell>{grant.project_title}</TableCell>
                            <TableCell>{grant.principal_investigator}</TableCell>
                            <TableCell>{grant.total_requested_budget}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GrantsTable;

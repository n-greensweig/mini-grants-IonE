// View 3.4 Reviewer View

// React
import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';

// Axios
import axios from 'axios';

// Styles
import './ScoredReviews.css'

// Material UI
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ScoredReviews() {

    const history = useHistory();

    const data = [
        {
            dateSubmitted: '2023-11-27',
            projectTitle: 'Research Grant A',
            projectPI: 'Dr. Johnson',
            score1: '21',
            score2: '16',
            score3: '17',
            placeholder: 'placeholder data',
        }
    ]
    const averageScore = () => {
        let result = (+data[0].score1 + +data[0].score2 + +data[0].score3) / 3
        return result;
    };

    console.log(averageScore());

    // MUI 

    const [funding, setFunding] = React.useState('');
    const selectFunding = (event) => {
        setFunding(event.target.value);
    }
    console.log(funding);

    return (
        <table className="scoresTable">
            <thead>
                <tr>
                    <th>Date Submitted</th>
                    <th>Project PI</th>
                    <th>Project Title</th>
                    <th>Score 1</th>
                    <th>Score 2</th>
                    <th>Score 3</th>
                    <th>Average Score</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.dateSubmitted}</td>
                        <td>{item.projectPI}</td>
                        <td>{item.projectTitle}</td>
                        <td>{item.score1}</td>
                        <td>{item.score2}</td>
                        <td>{item.score3}</td>
                        <td> {averageScore()}

                            {/* <FormControl fullWidth>
                                <InputLabel id="select-label">Select</InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="funding-selection"
                                    value={funding}
                                    label="Select"
                                    onChange={selectFunding}
                                >
                                    <MenuItem id="funding-selection" value={'Full'}>Full</MenuItem>
                                    <MenuItem id="funding-selection" value={'Per Availability'}>Per Availability</MenuItem>
                                    <MenuItem id="funding-selection" value={'Not Recommended'}>Not Recommended</MenuItem>
                                </Select>
                            </FormControl> */}
                        </td>
                        <td>
                            <button onClick={() => viewReviewDetails(item.grantName)}>
                                View Details
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    );
};

export default ScoredReviews;
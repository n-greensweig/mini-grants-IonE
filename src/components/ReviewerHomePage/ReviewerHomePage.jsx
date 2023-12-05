// View 3.2 Reviewer View

// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Axios
import axios from 'axios';

// Styles
import './ReviewerHomePage.css';

function ReviewerHomePage(){

    const history = useHistory();
    const [data, setData] = useState([]);

    const fetchData = () => {
        axios.get('/grants/reviewerhomepage')
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log('Error fetching reviewer grants:', error);
        });
    }

    const handleReviewClick = (grantName) => {
        console.log(`Review button clicked for grant: ${grantName}`);
        // Use history.push to navigate to the "/grantreviewform" route
        history.push('/grantreviewform')
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="reviewerTable">
            <thead>
                <tr>
                    <th>Date Submitted</th>
                    <th>Name of Grant</th>
                    <th>Sponsoring Professor</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.time_stamp}</td>
                        <td>{item.project_title}</td>
                        <td>{item.principal_investigator}</td>
                        <td>{item.department_name}</td>
                        <td>Status Placeholder</td>
                        <td>
                            <button onClick={() => handleReviewClick(item.project_title)}>
                                Review
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    );

}

export default ReviewerHomePage;
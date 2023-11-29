// View 3.2 Reviewer View

// React
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Axios
import axios from 'axios';

// Styles
import './ReviewerHomePage.css';

function ReviewerHomePage(){

    const history = useHistory();

    const data = [
        {
            dateSubmitted: '2023-11-27',
            grantName: 'Research Grant A',
            sponsoringProfessor: 'Dr. Johnson',
            department: 'Mathematics',
            status: 'Review Needed',
        }
    ];

    const handleReviewClick = (grantName) => {
        console.log(`Review button clicked for grant: ${grantName}`);
        // Use history.push to navigate to the "/grantreviewform" route
        history.push('/grantreviewform')
    };

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
                        <td>{item.dateSubmitted}</td>
                        <td>{item.grantName}</td>
                        <td>{item.sponsoringProfessor}</td>
                        <td>{item.department}</td>
                        <td>{item.status}</td>
                        <td>
                            <button onClick={() => handleReviewClick(item.grantName)}>
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
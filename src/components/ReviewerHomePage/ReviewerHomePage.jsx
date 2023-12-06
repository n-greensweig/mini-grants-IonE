// View 3.2 Reviewer View

// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Axios
import axios from 'axios';

// Styles
import './ReviewerHomePage.css';

function ReviewerHomePage(){

    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const currentCycle = useSelector((store) => store.user.currentCycle);


    const fetchData = () => {
        axios.get('/grants/reviewer-grants', {cycle_id: currentCycle.id})
        .then(response => {
            setData(response.data);
        })
        .catch(error => {
            console.log('Error fetching reviewer grants:', error);
        });
    }

    const handleReviewClick = (item) => {
        dispatch({ type: 'SET_REVIEW', payload: item });
        console.log(`Review button clicked for grant: ${item.project_title}`);
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
                        <td>{item.formatted_date}</td>
                        <td>{item.project_title}</td>
                        <td>{item.principal_investigator}</td>
                        <td>{item.PI_primary_college}</td>
                        <td>Status Placeholder</td>
                        <td>
                            <button onClick={() => handleReviewClick(item)}>
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
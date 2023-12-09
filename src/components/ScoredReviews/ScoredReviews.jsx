// View 3.4 Reviewer View

// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Axios
import axios from 'axios';

// Styles
import './ScoredReviews.css'

function ScoredReviews() {

    const history = useHistory();

    const [scoredReviews, setScoredReviews] = useState([]);
    
    const fetchScoredReviews = () => {
        axios.get(`/grants/allGrantInfo/18`)
        .then(response => {
            setScoredReviews(response.data);
        })
        .catch(error => {
            console.log('Error fetching scored reviews:', error);
        });
    }

    useEffect(() => {
        fetchScoredReviews();
    }, []);

    console.log(scoredReviews);

    const viewReviewDetails = (id) => {
        console.log(`Clicked view scored review details button`);
        // Use history.push to navigate to the "/grantreviewform" route
        history.push(`/scoredreviewdetails/${id}`)
    };

    return (
        <table className="scoresTable">
            <thead>
                <tr>
                    <th>Principal Investigator</th>
                    <th>Project Title</th>
                    <th>Score 1</th>
                    <th>Score 2</th>
                    <th>Score 3</th>
                    <th>Average Score</th>
                    
                </tr>
            </thead>
            <tbody>
                {scoredReviews.map((item, index) => (
                    (item.reviewer_scores && item.reviewer_scores[0] && item.reviewer_scores[0][9] && item.reviewer_scores[1] && item.reviewer_scores[1][9] 
                    && item.reviewer_scores[2] && item.reviewer_scores[2][9]) !== null && (
                    <tr key={index}>
                        <td>{item.principal_investigator}</td>
                        <td>{item.project_title}</td>
                        <td>{item.reviewer_scores && item.reviewer_scores[0] && item.reviewer_scores[0][9] ? +item.reviewer_scores[0][9] : 'N/A'}</td>
                        <td>{item.reviewer_scores && item.reviewer_scores[1] && item.reviewer_scores[1][9] ? +item.reviewer_scores[1][9] : 'N/A'}</td>
                        <td>{item.reviewer_scores && item.reviewer_scores[2] && item.reviewer_scores[2][9] ? +item.reviewer_scores[2][9] : 'N/A'}</td>
                        <td>{item.reviewer_scores && item.reviewer_scores[2] && item.reviewer_scores[2][9] && item.reviewer_scores[1] 
                                && item.reviewer_scores[1][9] && item.reviewer_scores[0] && item.reviewer_scores[0][9] ? 
                                ((+item.reviewer_scores[0][9]) + (+item.reviewer_scores[1][9]) + (+item.reviewer_scores[2][9])) / 3  : "N/A"}

                        </td>
                        <td>
                            <button onClick={() => viewReviewDetails(item.id)}>
                                View Details
                            </button>
                        </td>
                    </tr>
                   )
                ))}
            </tbody>
        </table>

    );
};

export default ScoredReviews;
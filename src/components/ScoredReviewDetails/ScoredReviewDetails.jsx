// React
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Axios
import axios from 'axios';

// Styles
import './ScoredReviewDetails.css'


function ScoredReviewDetails() {

    const history = useHistory();
    const id = useParams();

    const [scoredGrantsDetails, setScoredGrantsDetails] = useState([]);

    const fetchReviewDetails = () => {
        axios.get(`/grants/scoredreviewsdetails/${id.id}`)
            .then((response) => {
                console.log(response.data);
                setScoredGrantsDetails(response.data)
            })
            .catch((error) => {
                console.log(error);
                res.sendStatus(500);
            })
    };

    // const details = scoredGrantsDetails[0];

    console.log(scoredGrantsDetails);


    useEffect(() => {
        fetchReviewDetails();
    }, []);


    const navigateBack = () => {
        history.goBack();
    } 

    return (
        <div id="grant-details">
            {scoredGrantsDetails.length > 0 ? (
                <>
                    <h3>{scoredGrantsDetails[0].project_title}</h3>
                    <h4>{scoredGrantsDetails[0].principal_investigator}</h4>

                    <table className="scoreDetailsTable">
                        <thead>
                            <tr>
                                <th>Reviewer</th>
                                <th>Interdisciplinary Collaboration</th>
                                <th>Project Goals</th>
                                <th>Method/Design</th>
                                <th>Budget</th>
                                <th>Impact</th>
                                <th>Final Recommendation</th>
                                <th>Total Score</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {scoredGrantsDetails.map((item, index) => ( 
                                <tr>
                                    <td>{item.name}</td>
                                    <td>{item.interdisciplinary}</td>
                                    <td>{item.goals}</td>
                                    <td>{item.method_and_design}</td>
                                    <td>{item.budget}</td>
                                    <td>{item.impact}</td>
                                    <td>{item.final_recommendation}</td>
                                    <td>{item.total_score}</td>
                                    <td>{item.comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button id="back-button" onClick={navigateBack}>BACK</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

}


export default ScoredReviewDetails;
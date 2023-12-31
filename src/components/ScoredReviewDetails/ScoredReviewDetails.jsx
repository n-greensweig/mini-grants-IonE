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
    console.log(id);

    const [scoredGrantsDetails, setScoredGrantsDetails] = useState([]);

    const fetchReviewDetails = () => {
        axios.get(`/grants/scoredreviewsdetails/${id.id}`)
            .then((response) => {
                console.log(response.data);
                setScoredGrantsDetails(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    };

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
                    <div>
                        <h3 className='details-titles'><u>Project Title</u></h3>
                        <h3>{scoredGrantsDetails[0].project_title}</h3>
                    </div>
                    <div>
                        <h4 className='details-titles'><u>Principal Investigator</u></h4>
                        <h4>{scoredGrantsDetails[0].principal_investigator}</h4>
                    </div>
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
                                <tr key={index}>
                                    <td>{item.reviewer_name}</td>
                                    <td>{item.interdisciplinary}</td>
                                    <td>{item.goals}</td>
                                    <td>{item.method_and_design}</td>
                                    <td>{item.budget}</td>
                                    <td>{item.impact_sum}</td>
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
// React
import React, { useState} from 'react';
import { useHistory } from 'react-router-dom';

// Axios
import axios from 'axios';

// Styles
import './ScoredReviewDetails.css'


function ScoredReviewDetails() {

    const history = useHistory();

    const navigateBack = () => {
        history.goBack();
    } 

    return (
        <div id="grant-details">
            <h3>Project Title</h3>
            <h4>Project PI</h4>

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
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

            <button id="back-button" onClick={navigateBack}>BACK</button>
        </div>
    );

}


export default ScoredReviewDetails;
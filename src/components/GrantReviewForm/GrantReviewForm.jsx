// View 3.3 Reviewer View

// React
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Axios
import axios from 'axios';

// Styles
import './GrantReviewForm.css'

function GrantReviewForm() {

    const history = useHistory();

    const [interdisciplinary, setInterdisciplinary] = useState('');
    const [goals, setGoals] = useState('');
    const [method_and_design, setMethod_and_design] = useState('');
    const [budget, setBudget] = useState('');
    const [impact, setImpact] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [comments, setComments] = useState('');

    const interdisciplinaryRadioChange = (event) => {
        setInterdisciplinary(event.target.id);
    };
    console.log(interdisciplinary);

    const goalsRadioChange = (event) => {
        setGoals(event.target.id);
    };
    console.log(goals);
    
    const method_and_designRadioChange = (event) => {
        setMethod_and_design(event.target.id);
    };
    console.log(method_and_design);

    const budgetRadioChange = (event) => {
        setBudget(event.target.id);
    };
    console.log(budget);
    
    const recommendationRadioChange = (event) => {
        setRecommendation(event.target.id);
    };
    console.log(recommendation);

    let submittedScores = {
        created_at: "1",
        grant_id: "1",
        reviewer_id: "1",
        assigned_by: "1",
        interdisciplinary: interdisciplinary,
        goals: goals,
        method_and_design: method_and_design,
        budget: budget,
        impact: impact,
        review_complete: true,
    };

    let savedScores = {
        created_at: "1",
        grant_id: "1",
        reviewer_id: "1",
        assigned_by: "1",
        interdisciplinary: interdisciplinary,
        goals: goals,
        method_and_design: method_and_design,
        budget: budget,
        impact: impact,
        review_complete: true,
    };

    const saveScores = () => {
        axios.post(`/grants/setScores`, savedScores)
            .then((response) => {
                console.log(savedScores);
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong.');
            });
        history.push(`/reviewerhomepage`);
    };

    const submitScores = () => {
        console.log(submittedScores);
        axios.post(`/grants/setScores`, submittedScores)
            .then((response) => {
                console.log(submittedScores);
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong.');
            });
        history.push(`/reviewerhomepage`);
    };

    return (
        <div id="review-form">
            {/* To add tooltips to all titles */}
            <p className='review-form-title'>Interdisciplinary Collaboration</p>
            <form>
                <input type="radio" id="1" name="interdisciplinary" value={interdisciplinary} onChange={interdisciplinaryRadioChange}/>
                <label for="interdisciplinary">1</label>
                <input type="radio" id="2" name="interdisciplinary" value={interdisciplinary} onChange={interdisciplinaryRadioChange}/>
                <label for="interdisciplinary">2</label>
                <input type="radio" id="3" name="interdisciplinary" value={interdisciplinary} onChange={interdisciplinaryRadioChange}/>
                <label for="interdisciplinary">3</label>
                <input type="radio" id="4" name="interdisciplinary" value={interdisciplinary} onChange={interdisciplinaryRadioChange}/>
                <label for="interdisciplinary">4</label>
                <input type="radio" id="5" name="interdisciplinary" value={interdisciplinary} onChange={interdisciplinaryRadioChange}/>
                <label for="interdisciplinary">5</label>
            </form>

            <p className='review-form-title'>Project Goals</p>
            <form>
                <input type="radio" id="1" name="goals" value={goals} onChange={goalsRadioChange}/>
                <label for="goals">1</label>
                <input type="radio" id="2" name="goals" value={goals} onChange={goalsRadioChange}/>
                <label for="goals">2</label>
                <input type="radio" id="3" name="goals" value={goals} onChange={goalsRadioChange}/>
                <label for="goals">3</label>
                <input type="radio" id="4" name="goals" value={goals} onChange={goalsRadioChange}/>
                <label for="goals">4</label>
                <input type="radio" id="5" name="goals" value={goals} onChange={goalsRadioChange}/>
                <label for="goals">5</label>
            </form>

            <p className='review-form-title'>Method/Design</p>
            <form>
                <input type="radio" id="0" name="method_and_design" value="method_and_design" onChange={method_and_designRadioChange}/>
                <label for="method_and_design">0</label>
                <input type="radio" id="2" name="method_and_design" value="method_and_design" onChange={method_and_designRadioChange}/>
                <label for="method_and_design">2</label>
                <input type="radio" id="3" name="method_and_design" value="method_and_design" onChange={method_and_designRadioChange}/>
                <label for="method_and_design">3</label>
                <input type="radio" id="5" name="method_and_design" value="method_and_design" onChange={method_and_designRadioChange}/>
                <label for="method_and_design">5</label>
            </form>

            <p className='review-form-title'>Budget</p>
            <form>
                <input type="radio" id="0" name="budget" value="budget" onChange={budgetRadioChange}/>
                <label for="budget">0</label>
                <input type="radio" id="0.5" name="budget" value="budget" onChange={budgetRadioChange}/>
                <label for="budget">0.5</label>
                <input type="radio" id="1" name="budget" value="budget" onChange={budgetRadioChange}/>
                <label for="budget">1</label>
                <input type="radio" id="2" name="budget" value="budget" onChange={budgetRadioChange}/>
                <label for="budget">2</label>
            </form>

            {/* Have to figure out how to add these up */}
            <p className='review-form-title'>Impact</p>
            <form>
                <input type="checkbox" id="2" name="impact" value="impact" />
                <label for="impact">2</label>
                <input type="checkbox" id="2" name="impact" value="impact" />
                <label for="impact">2</label>
                <input type="checkbox" id="2" name="impact" value="impact" />
                <label for="impact">2</label>
            </form>

            <p className='review-form-title'>Final Recommendation</p>
            <form>
                <input type="radio" id="0" name="recommendation" value={recommendation} onChange={recommendationRadioChange}/>
                <label for="recommendation">0</label>
                <input type="radio" id="2" name="recommendation" value={recommendation} onChange={recommendationRadioChange}/>
                <label for="recommendation">2</label>
                <input type="radio" id="3" name="recommendation" value={recommendation} onChange={recommendationRadioChange}/>
                <label for="recommendation">3</label>
            </form>

            <p className='review-form-title'>Comments</p>
                <textarea
                    rows="7"
                    cols="38"
                    placeholder='Enter review comments here'
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />

            <br />
            <br />

            <button onClick={saveScores}>Save</button> <button onClick={submitScores}>Submit</button>

        </div>
    )
}

export default GrantReviewForm;

// Will go back to Reviewer Home Page 3.2
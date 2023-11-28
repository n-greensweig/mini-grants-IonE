// View 3.3 Reviewer View

// React
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Axios
import axios from 'axios';

// Styles
import './GrantReviewForm.css'

function GrantReviewForm(){

    const [collaboration, setCollaboration] = useState('');
    const [goals, setGoals] = useState('');
    const [design, setDesign] = useState('');
    const [budget, setBudget] = useState('');
    const [impact, setImpact] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [comments, setComments] = useState('');

    const collaborationRadioChange = (event) => {
        setCollaboration(event.target.id);
    };
    console.log(collaboration);

    const goalsRadioChange = (event) => {
        setGoals(event.target.id);
    };
    console.log(goals);
    
    const designRadioChange = (event) => {
        setDesign(event.target.id);
    };
    console.log(design);

    const budgetRadioChange = (event) => {
        setBudget(event.target.id);
    };
    console.log(budget);
    
    const recommendationRadioChange = (event) => {
        setRecommendation(event.target.id);
    };
    console.log(recommendation);

    return (
        <div id="review-form">
            {/* To add tooltips to all titles */}
            <p className='review-form-title'>Interdisciplinary Collaboration</p>
            <form>
                <input type="radio" id="1" name="collaboration" value={collaboration} onChange={collaborationRadioChange}/>
                <label for="collaboration">1</label>
                <input type="radio" id="2" name="collaboration" value={collaboration} onChange={collaborationRadioChange}/>
                <label for="collaboration">2</label>
                <input type="radio" id="3" name="collaboration" value={collaboration} onChange={collaborationRadioChange}/>
                <label for="collaboration">3</label>
                <input type="radio" id="4" name="collaboration" value={collaboration} onChange={collaborationRadioChange}/>
                <label for="collaboration">4</label>
                <input type="radio" id="5" name="collaboration" value={collaboration} onChange={collaborationRadioChange}/>
                <label for="collaboration">5</label>
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

            <p className='review-form-title'>Method Design</p>
            <form>
                <input type="radio" id="0" name="design" value="design" onChange={designRadioChange}/>
                <label for="design">0</label>
                <input type="radio" id="2" name="design" value="design" onChange={designRadioChange}/>
                <label for="design">2</label>
                <input type="radio" id="3" name="design" value="design" onChange={designRadioChange}/>
                <label for="design">3</label>
                <input type="radio" id="5" name="design" value="design" onChange={designRadioChange}/>
                <label for="design">5</label>
            </form>

            <p className='review-form-title'>Budget</p>
            <form>
                <input type="radio" id="0" name="design" value="budget" onChange={budgetRadioChange}/>
                <label for="budget">0</label>
                <input type="radio" id="0.5" name="design" value="budget" onChange={budgetRadioChange}/>
                <label for="budget">0.5</label>
                <input type="radio" id="1" name="design" value="budget" onChange={budgetRadioChange}/>
                <label for="budget">1</label>
                <input type="radio" id="2" name="design" value="budget" onChange={budgetRadioChange}/>
                <label for="budget">2</label>
            </form>

            {/* Have to figure out how to add these up */}
            <p className='review-form-title'>Impact</p>
            <form>
                <input type="checkbox" id="2" name="design" value="impact" />
                <label for="impact">2</label>
                <input type="checkbox" id="2" name="design" value="impact" />
                <label for="impact">2</label>
                <input type="checkbox" id="2" name="design" value="impact" />
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

        </div>
    )
}

export default GrantReviewForm;
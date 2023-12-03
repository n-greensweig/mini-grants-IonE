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

    const [interdisciplinary, setInterdisciplinary] = useState(null);
    const [goals, setGoals] = useState(null);
    const [method_and_design, setMethod_and_design] = useState(null);
    const [budget, setBudget] = useState(null);
    const [impact1, setImpact1] = useState(0);
    const [impact2, setImpact2] = useState(0);
    const [impact3, setImpact3] = useState(0);
    const [recommendation, setRecommendation] = useState(null);
    const [comments, setComments] = useState(null);

    const interdisciplinaryRadioChange = (event) => {
        setInterdisciplinary(+event.target.id);
    };
    console.log(interdisciplinary);

    const goalsRadioChange = (event) => {
        setGoals(+event.target.id);
    };
    console.log(goals);
    
    const method_and_designRadioChange = (event) => {
        setMethod_and_design(+event.target.id);
    };
    console.log(method_and_design);

    const budgetRadioChange = (event) => {
        setBudget(+event.target.id);
    };
    console.log(budget);

    let impactSum = ((+impact1) + (+impact2) + (+impact3))
    console.log(impactSum);

    const recommendationRadioChange = (event) => {
        setRecommendation(+event.target.id);
    };
    console.log(recommendation);

    let totalScore = (interdisciplinary + method_and_design + budget + impactSum + recommendation);
    console.log(totalScore);

    let submittedScores = {
        created_at: "11-27-2023 1:03pm",
        grant_id: 1,
        reviewer_id: 1,
        assigned_by: 1,
        interdisciplinary: interdisciplinary,
        goals: goals,
        method_and_design: method_and_design,
        budget: budget,
        impact: impactSum,
        review_complete: true,
    };

    let savedScores = {
        created_at: "11-27-2023 1:03pm",
        grant_id: 1,
        reviewer_id: 1,
        assigned_by: 1,
        interdisciplinary: interdisciplinary,
        goals: goals,
        method_and_design: method_and_design,
        budget: budget,
        impact: impactSum,
        review_complete: false,
    };

    const saveScores = () => {
        console.log(savedScores);
        axios.post(`/grants/setScores`, savedScores)
            .then((response) => {
                console.log(savedScores);
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong.');
            });
        // history.push(`/reviewerhomepage`);
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
            <br />
            <h4><span>Welcome </span><span><i>Reviewer</i></span></h4>
            <p>This form is unique to each reviewer. Please use the review guidance criteria in Columns F through L to review the proposals assigned for your review in Column E.</p>
            
            <h4>Project PI: </h4>
                <p>PI Name</p>
            <h4>Project Title:</h4>
                <p>Project Title</p>

            <form>
                <table>
                    <tr>
                        <th colspan="2">Interdisciplinary Collaboration</th>
                    </tr>
                    <tr>
                        <td><input type="radio" id="5" name="interdisciplinary" value={interdisciplinary} onChange={interdisciplinaryRadioChange}/></td>
                        <td>
                            <span id="points">5 pts</span> - This proposal includes both individuals from the university and external 
                            (non-university) collaborators that represent an exemplary variety of disciplines, expertise, and ways of 
                            knowing. Examples would include a combination of participants or perspectives including (but not limited to) 
                            STEM and/or social scientists, humanities scholars, artists, community experts, industry experts, and/or policy experts.
                        </td>
                    </tr>
                    <tr>
                        <td><input type="radio" id="3" name="interdisciplinary" value={interdisciplinary} onChange={interdisciplinaryRadioChange}/></td>
                        <td>
                            <span id="points">3 pts</span> - This proposal includes individuals from within the university as well as 
                            external (non-university) stakeholders or experts, each of whom add well-articulated value to the project. 
                            Partners represent different units/departments or fields of expertise, but those units, departments, or
                            forms of expertise are closely related.
                        </td>
                    </tr>
                    <tr>
                        <td><input type="radio" id="2" name="interdisciplinary" value={interdisciplinary} onChange={interdisciplinaryRadioChange}/></td>
                        <td>
                            <span id="points">2 pts</span> - This proposal includes individuals from the university from different 
                            departments, units, organizations, and/or affiliations (faculty,staff, students), each of whom add value to 
                            the project. The project is interdisciplinary, but does not appear to have non-university partners.
                        </td>
                    </tr>
                    <tr id="second-to-last">
                        <td><input type="radio" id="1" name="interdisciplinary" value={interdisciplinary} onChange={interdisciplinaryRadioChange}/></td>
                        <td>
                            <span id="points">1 pts</span> - This proposal appears to be interdisciplinary based on team members' 
                            affiliation, but one or more of the partners' roles is poorly defined or does not appear to add value.
                        </td>
                    </tr>
                    <tr id="last">
                        <td><input type="radio" id="0" name="interdisciplinary" value={interdisciplinary} onChange={interdisciplinaryRadioChange}/></td>
                        <td>
                            <span id="points">0 pts</span> - This proposal does not appear to be interdisciplinary; only one unit
                            or discipline is represented, and no external partners are present.
                        </td>
                    </tr>
                </table>
            </form>

            <form>
                <table>
                    <tr>
                        <th colspan="2">Project Goals</th>
                    </tr>
                    <tr>
                        <td><input type="radio" id="5" name="goals" value={goals} onChange={goalsRadioChange}/></td>
                        <td>
                            <span id="points">5 pts</span> - Illustrates a powerful approach or solution to a compelling problem or 
                            opportunity; goals are clear and attainable. Connection to the environment or sustainability is explicit 
                            and clear. Proposal is able to articulate the impact of successful outcomes.
                        </td>
                    </tr>
                    <tr>
                        <td><input type="radio" id="3" name="goals" value={goals} onChange={goalsRadioChange}/></td>
                        <td>
                            <span id="points">3 pts</span> - Provides an interesting or novel approach to a compelling problem or 
                            opportunity; goals are clear and attainable. Connection to the environment or sustainability is clear.
                        </td>
                    </tr>
                    <tr>
                        <td><input type="radio" id="2" name="goals" value={goals} onChange={goalsRadioChange}/></td>
                        <td>
                            <span id="points">2 pts</span> - Goals and/or outcomes are clear, but their relationship to the 
                            problem is vague. Proposal appears to have a relationship to environment or sustainability issues.
                        </td>
                    </tr>
                    <tr id="second-to-last">
                        <td><input type="radio" id="1" name="goals" value={goals} onChange={goalsRadioChange}/></td>
                        <td>
                            <span id="points">1 pts</span> - Proposal appears to have a relationship to environment or sustainability 
                            issues, but the goals and/or outcomes are not clearly articulated.
                        </td>
                    </tr>
                    <tr id="last">
                        <td><input type="radio" id="0" name="goals" value={goals} onChange={goalsRadioChange}/></td>
                        <td>
                            <span id="points">0 pts</span> - Communicated goals and/or outcomes do
                            not relate to environmental or sustainability
                            issues.
                        </td>
                    </tr>
                </table>
            </form>
            
            <form>
                <table>
                    <tr>
                        <th colspan="2">Method/Design</th>
                    </tr>
                    <tr>
                        <td><input type="radio" id="5" name="method_and_design" value="method_and_design" onChange={method_and_designRadioChange}/></td>
                        <td>
                            <span id="points">5 pts</span> - All aspects of this cohesive project are thoroughly articulated and 
                            logically connected. Purpose and impact are clear.
                        </td>
                    </tr>
                    <tr>
                        <td><input type="radio" id="3" name="method_and_design" value="method_and_design" onChange={method_and_designRadioChange}/></td>
                        <td>
                            <span id="points">3 pts</span> - Most aspects of the project or proposal are thoroughly articulated and 
                            logically connected; purpose and/or impact is mostly clear.
                        </td>
                    </tr>
                    <tr id="second-to-last">
                        <td><input type="radio" id="2" name="method_and_design" value="method_and_design" onChange={method_and_designRadioChange}/></td>
                        <td>
                            <span id="points">2 pts</span> - Some aspects of this project or proposal are well articulated
                            and connected, but the proposal struggles to connect all the dots. Purpose and/or impact is not
                            clearly defined.
                        </td>
                    </tr>
                    <tr id="last">
                        <td><input type="radio" id="0" name="method_and_design" value="method_and_design" onChange={method_and_designRadioChange}/></td>
                        <td>
                            <span id="points">0 pts</span>- Almost all aspects of the project design are incoherent; purpose and/or 
                            impact is unclear.
                        </td>
                    </tr>
                </table>
            </form>

            <form>
                <table>
                    <tr>
                        <th colspan="2">Budget</th>
                    </tr>
                    <tr>
                        <td><input type="radio" id="2" name="budget" value="budget" onChange={budgetRadioChange}/></td>
                        <td>
                            <span id="points">2 pts</span> - Budget is accurate, detailed, cost-effective, and crafted to fully 
                            support the scope of work.
                        </td>
                    </tr>
                    <tr>
                        <td><input type="radio" id="1" name="budget" value="budget" onChange={budgetRadioChange}/></td>
                        <td>
                            <span id="points">1 pts</span> - Budget is accurate and detailed, but it may inadequately support the scope
                            of work. The project may need to scale up or down.
                        </td>
                    </tr>
                    <tr id="second-to-last">
                        <td><input type="radio" id="0.5" name="budget" value="budget" onChange={budgetRadioChange}/></td>
                        <td>
                            <span id="points">0.5 pts</span>- Budget lacks sufficient detail.
                        </td>
                    </tr>
                    <tr id="last">
                        <td><input type="radio" id="0" name="budget" value="budget" onChange={budgetRadioChange}/></td>
                        <td>
                            <span id="points">0 pts</span> - Budget is incomplete, over $3,000, or contains unallowable expenses 
                            includingfaculty / staff salary, alcohol, or other banned expenses per UMN policy.
                        </td>
                    </tr>
                </table>
            </form>
            
            <form>
                <table>
                    <tr>
                        <th colspan="2">Impact <i>(optional)</i></th>
                    </tr>
                    <tr id="white">
                        <td><input type="checkbox" id="2" name="impact1" value="impact1" onChange={(e) => setImpact1(e.target.checked ? e.target.id : 0)}/></td>
                        <td>
                            <span id="points">2 pts</span> - Meaningfully addresses diversity, equity, or inclusion.
                        </td>
                    </tr>
                    <tr id="white">
                        <td><input type="checkbox" id="2" name="impact2" value="impact2" onChange={(e) => setImpact2(e.target.checked ? e.target.id : 0)}/></td>
                        <td>
                            <span id="points">2 pts</span> - Clearly aligns with one or more IonE Impact Goals: (1) Building a 
                            Carbon-Neutral Minnesota, (2) Envisioning Future Sustainable Land Use in Minnesota, or (3) Ensuring Safe
                            Drinking Water in Minnesota.
                        </td>
                    </tr>
                    <tr id="white">
                        <td><input type="checkbox" id="2" name="impact3" value="impact3" onChange={(e) => setImpact3(e.target.checked ? e.target.id : 0)}/></td>
                        <td>
                            <span id="points">2 pts</span> - Clearly aligns with UMN Systemwide Strategic Plan, specifically the 
                            MNtersections initiative: (1) Drives innovation for next-generation health, (2) Build a fully sustainable
                            future, or (3) Advance natural resources and agro-food systems to elevate human security and potential.
                        </td>
                    </tr>
                </table>
            </form>

            {/* Have to figure out how to add these up */}
            <form>
                <table>
                    <tr>
                        <th colspan="2">Final Recommendation</th>
                    </tr>
                    <tr>
                        <td><input type="radio" id="3" name="recommendation" value={recommendation} onChange={recommendationRadioChange}/></td>
                        <td><span id="points">3 pts</span><span id="points"></span>- Proposal recommended for full funding.</td>
                    </tr>
                    <tr>
                        <td><input type="radio" id="2" name="recommendation" value={recommendation} onChange={recommendationRadioChange}/></td>
                        <td><span id="points">2 pts</span> - Proposal should be funded in accordance withavailable resources.</td>
                    </tr>
                    <tr id="last">
                        <td><input type="radio" id="0" name="recommendation" value={recommendation} onChange={recommendationRadioChange}/></td>
                        <td><span id="points">0 pts</span> - Proposal not recommended for funding.</td>
                    </tr>
                </table>
            </form>

            <p className='review-form-title'>Reviewer Comments<i> (REQUIRED)</i></p>
                <textarea
                    rows="8"
                    placeholder='Enter review comments here.'
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />

            <br />
            <br />

            <h3>Proposal Score: <i>{totalScore}</i></h3>

            <br />

            <button onClick={saveScores}>Save</button> <button onClick={submitScores}>Submit</button>

        </div>
    )
}

export default GrantReviewForm;

// Will go back to Reviewer Home Page 3.2
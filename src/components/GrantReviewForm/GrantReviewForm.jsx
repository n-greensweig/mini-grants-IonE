// View 3.3 Reviewer View

// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PDFDownloadLink } from '@react-pdf/renderer';

// Axios
import axios from 'axios';

// Styles
import './GrantReviewForm.css'

// Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

// child components
import PDFDocument from '../PDF/PDFDocument';

function GrantReviewForm() {

    const user = useSelector(store => store.user.userReducer);
    const grantInfo = useSelector((store) => store.reviewer.reviewGrantReducer);

    const date = new Date();
    const submittedDate = (date.toLocaleDateString("en-US"));

    const history = useHistory();

    const [interdisciplinary, setInterdisciplinary] = useState(null);
    const [goals, setGoals] = useState(null);
    const [method_and_design, setMethod_and_design] = useState(null);
    const [budget, setBudget] = useState(null);
    const [impact1, setImpact1] = useState(null);
    const [impact2, setImpact2] = useState(null);
    const [impact3, setImpact3] = useState(null);
    const [final_recommendation, setFinal_Recommendation] = useState(null);
    const [comments, setComments] = useState(null);

    const interdisciplinaryRadioChange = (event) => {
        setInterdisciplinary(+event.target.id); // '+' turns value to integer instead of a string
    };

    const goalsRadioChange = (event) => {
        setGoals(+event.target.id);
    };
    
    const method_and_designRadioChange = (event) => {
        setMethod_and_design(+event.target.id);
    };

    const budgetRadioChange = (event) => {
        setBudget(+event.target.id);
    };

    console.log(budget);

    const impactSum = ((+impact1) + (+impact2) + (+impact3))

    const recommendationRadioChange = (event) => {
        setFinal_Recommendation(+event.target.id);
    };

    let totalScore = (interdisciplinary + goals + method_and_design + (+budget) + impactSum + final_recommendation);

    // Will need data from other components for created_at, grant_id, reviewer_id, and assigned_by
    let submittedScores = {
        created_at: submittedDate,
        grant_id: grantInfo.grant_id,
        reviewer_id: user.id,
        interdisciplinary: interdisciplinary,
        goals: goals,
        method_and_design: method_and_design,
        budget: +budget,
        impact1: +impact1,
        impact2: +impact2,
        impact3: +impact3,
        impactSum: impactSum,
        final_recommendation: final_recommendation,
        comments: comments,
        review_complete: true,
        total_score: totalScore,
        principal_investigator: grantInfo.principal_investigator,
        project_title: grantInfo.project_title,
    };

    let savedScores = {
        created_at: submittedDate,
        grant_id: grantInfo.grant_id,
        reviewer_id: user.id,
        interdisciplinary: interdisciplinary,
        goals: goals,
        method_and_design: method_and_design,
        budget: +budget,
        impact1: +impact1,
        impact2: +impact2,
        impact3: +impact3,
        impactSum: impactSum,
        final_recommendation: final_recommendation,
        comments: comments,
        review_complete: false,
        total_score: totalScore,
        principal_investigator: grantInfo.principal_investigator,
        project_title: grantInfo.project_title,
    };

    // Material UI Dialog Box variables

    const [openSaveDialog, setOpenSaveDialog] = useState(false);
    const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

    const handleOpenSaveDialog = () => {
        setOpenSaveDialog(true);
    };

    const handleCloseSaveDialog = () => {
        setOpenSaveDialog(false);
    };

    const handleOpenSubmitDialog = () => {
        setOpenSubmitDialog(true);
    };

    const handleCloseSubmitDialog = () => {
        setOpenSubmitDialog(false);
    };

    console.log(grantInfo.interdisciplinary);
    
    // End MUI


    useEffect(() => { 
        setInterdisciplinary(grantInfo.interdisciplinary ?? null);
            setGoals(grantInfo.goals ?? null);
            setMethod_and_design(grantInfo.method_and_design ?? null);
            setBudget(+grantInfo.budget ?? null);
            setImpact1(grantInfo.impact1 ?? null);
            setImpact2(grantInfo.impact2 ?? null);
            setImpact3(grantInfo.impact3 ?? null);
            setFinal_Recommendation(grantInfo.final_recommendation ?? null);
            setComments(grantInfo.comments ?? null);
        },
     [grantInfo]);

     console.log(typeof grantInfo.budget);

    const saveScores = () => {
        console.log(savedScores);
        axios.post(`/grants/setScores`, savedScores)
            .then((response) => {
                console.log(savedScores);
            }).catch((error) => {
                console.log(error);
                alert('Something went wrong.');
            });
        handleCloseSaveDialog();
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
        handleCloseSubmitDialog();
        history.push(`/reviewerhomepage`);
    };
    console.log(user);

    return (
        <div id="review-form">
            <br />
            <div className="heading">
                {/* Reviewer will be variable brought in from other components */}
                <h3><span>Welcome </span><span><i>{user.fullName}</i></span></h3>
                <p>This form is unique to each reviewer. Please use the review guidance criteria for each category below to review the proposal.</p>
                
                <div id="title">
                    <div>
                        <h4 className='titles' id="download"><PDFDownloadLink document={<PDFDocument grantInfo={grantInfo}/>} fileName={`IonE_Mini_Grant_PI_${grantInfo.principal_investigator}.pdf`}>
                            {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download Grant PDF'
                            }
                        </PDFDownloadLink></h4>
                    </div>

                    <div id="project-info">
                        <h4 className='titles'><u>Principal Investigator</u></h4>
                        {/* PI Name will be variable sourced from other components */}
                        <p>{grantInfo.principal_investigator}</p> 
                        <h4 className='titles'><u>Project Title</u></h4>
                        {/* Project Title will be variable sourced from other components */}
                        <p><i>{grantInfo.project_title}</i></p>
                    </div>
 

                </div>

            </div>

            <br/>

            <form>
                <table>
                    <tr>
                        <th colSpan="2">Interdisciplinary Collaboration</th>
                    </tr>
                    <tr id="first">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="5" 
                                name="interdisciplinary" 
                                value={(interdisciplinary)}
                                checked={interdisciplinary === 5} 
                                onChange={interdisciplinaryRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">5 pts</span> - This proposal includes both individuals from the university and external 
                            (non-university) collaborators that represent an exemplary variety of disciplines, expertise, and ways of 
                            knowing. Examples would include a combination of participants or perspectives including (but not limited to) 
                            STEM and/or social scientists, humanities scholars, artists, community experts, industry experts, and/or policy experts.
                        </td>
                    </tr>
                    <tr id="second">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="3" 
                                name="interdisciplinary" 
                                value={interdisciplinary}
                                checked={interdisciplinary === 3}  
                                onChange={interdisciplinaryRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">3 pts</span> - This proposal includes individuals from within the university as well as 
                            external (non-university) stakeholders or experts, each of whom add well-articulated value to the project. 
                            Partners represent different units/departments or fields of expertise, but those units, departments, or
                            forms of expertise are closely related.
                        </td>
                    </tr>
                    <tr id="third">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="2" 
                                name="interdisciplinary" 
                                value={interdisciplinary}
                                checked={interdisciplinary === 2} 
                                onChange={interdisciplinaryRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">2 pts</span> - This proposal includes individuals from the university from different 
                            departments, units, organizations, and/or affiliations (faculty,staff, students), each of whom add value to 
                            the project. The project is interdisciplinary, but does not appear to have non-university partners.
                        </td>
                    </tr>
                    <tr id="second-to-last">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="1" 
                                name="interdisciplinary" 
                                value={interdisciplinary}
                                checked={interdisciplinary === 1} 
                                onChange={interdisciplinaryRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">1 pts</span> - This proposal appears to be interdisciplinary based on team members' 
                            affiliation, but one or more of the partners' roles is poorly defined or does not appear to add value.
                        </td>
                    </tr>
                    <tr id="last">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="0" 
                                name="interdisciplinary" 
                                value={interdisciplinary}
                                checked={interdisciplinary === 0} 
                                onChange={interdisciplinaryRadioChange}
                            />
                        </td>
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
                        <th colSpan="2">Project Goals</th>
                    </tr>
                    <tr id="first">
                        <td className="radio-td"
                            ><input 
                                type="radio" 
                                id="5" name="goals" 
                                value={goals}
                                checked={goals === 5}  
                                onChange={goalsRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">5 pts</span> - Illustrates a powerful approach or solution to a compelling problem or 
                            opportunity; goals are clear and attainable. Connection to the environment or sustainability is explicit 
                            and clear. Proposal is able to articulate the impact of successful outcomes.
                        </td>
                    </tr>
                    <tr id="second">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="3" 
                                name="goals" 
                                value={goals}
                                checked={goals === 3} 
                                onChange={goalsRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">3 pts</span> - Provides an interesting or novel approach to a compelling problem or 
                            opportunity; goals are clear and attainable. Connection to the environment or sustainability is clear.
                        </td>
                    </tr>
                    <tr id="third">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="2" 
                                name="goals" 
                                value={goals}
                                checked={goals === 2}
                                onChange={goalsRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">2 pts</span> - Goals and/or outcomes are clear, but their relationship to the 
                            problem is vague. Proposal appears to have a relationship to environment or sustainability issues.
                        </td>
                    </tr>
                    <tr id="second-to-last">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="1" 
                                name="goals" 
                                value={goals}
                                checked={goals === 1}
                                onChange={goalsRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">1 pts</span> - Proposal appears to have a relationship to environment or sustainability 
                            issues, but the goals and/or outcomes are not clearly articulated.
                        </td>
                    </tr>
                    <tr id="last">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="0" 
                                name="goals" 
                                value={goals}
                                checked={goals === 0}
                                onChange={goalsRadioChange}
                            />
                        </td>
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
                        <th colSpan="2">Method/Design</th>
                    </tr>
                    <tr id="first">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="5" 
                                name="method_and_design" 
                                value={method_and_design}
                                checked={method_and_design === 5}
                                onChange={method_and_designRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">5 pts</span> - All aspects of this cohesive project are thoroughly articulated and 
                            logically connected. Purpose and impact are clear.
                        </td>
                    </tr>
                    <tr id="second">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="3" 
                                name="method_and_design" 
                                value={method_and_design}
                                checked={method_and_design === 3}
                                onChange={method_and_designRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">3 pts</span> - Most aspects of the project or proposal are thoroughly articulated and 
                            logically connected; purpose and/or impact is mostly clear.
                        </td>
                    </tr>
                    <tr id="second-to-last">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="2" 
                                name="method_and_design" 
                                value={method_and_design}
                                checked={method_and_design === 2}
                                onChange={method_and_designRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">2 pts</span> - Some aspects of this project or proposal are well articulated
                            and connected, but the proposal struggles to connect all the dots. Purpose and/or impact is not
                            clearly defined.
                        </td>
                    </tr>
                    <tr id="last">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="0" 
                                name="method_and_design" 
                                value={method_and_design}
                                checked={method_and_design === 0}
                                onChange={method_and_designRadioChange}
                            />
                        </td>
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
                        <th colSpan="2">Budget</th>
                    </tr>
                    <tr id="first">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="2" 
                                name="budget" 
                                value={budget}
                                checked={budget === 2} 
                                onChange={budgetRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">2 pts</span> - Budget is accurate, detailed, cost-effective, and crafted to fully 
                            support the scope of work.
                        </td>
                    </tr>
                    <tr id="second">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="1" 
                                name="budget" 
                                value={budget} 
                                checked={budget === 1} 
                                onChange={budgetRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">1 pts</span> - Budget is accurate and detailed, but it may inadequately support the scope
                            of work. The project may need to scale up or down.
                        </td>
                    </tr>
                    <tr id="second-to-last">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="0.5" 
                                name="budget" 
                                value={budget} 
                                checked={budget === 0.5} 
                                onChange={budgetRadioChange}
                            />
                        </td>
                        <td>
                            <span id="points">0.5 pts</span>- Budget lacks sufficient detail.
                        </td>
                    </tr>
                    <tr id="last">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="0" 
                                name="budget" 
                                value={budget} 
                                checked={budget === 0} 
                                onChange={budgetRadioChange}/>
                            </td>
                        <td>
                            <span id="points">0 pts</span> - Budget is incomplete, over $3,000, or contains unallowable expenses 
                            including faculty / staff salary, alcohol, or other banned expenses per UMN policy.
                        </td>
                    </tr>
                </table>
            </form>
            
            <form>
                <table>
                    <tr>
                        <th colSpan="2">Impact <i>(optional)</i></th>
                    </tr>
                    <tr id="white">
                        <td className="radio-td">
                            <input 
                                type="checkbox" 
                                id="2" 
                                name="impact1" 
                                value={impact1}
                                checked={+impact1 === 2} 
                                onChange={(e) => setImpact1(e.target.checked ? e.target.id : 0)}
                            />
                        </td>
                        <td>
                            <span id="points">2 pts</span> - Meaningfully addresses diversity, equity, inclusion and/or justice.
                        </td>
                    </tr>
                    <tr id="white">
                        <td className="radio-td">
                            <input 
                                type="checkbox" 
                                id="2" 
                                name="impact2" 
                                value={impact2}
                                checked={+impact2 === 2}  
                                onChange={(e) => setImpact2(e.target.checked ? e.target.id : 0)}
                            />
                        </td>
                        <td>
                            <span id="points">2 pts</span> - Clearly aligns with one or more IonE Impact Goals: 
                                <ul>
                                    <li>Building a Carbon-Neutral Minnesota.</li>
                                    <li>Envisioning Future Sustainable Land Use in Minnesota.</li>
                                    <li>Ensuring Safe Drinking Water in Minnesota.</li>
                                </ul>
                        </td>
                    </tr>
                    <tr id="white">
                        <td className="radio-td">
                            <input 
                                type="checkbox" 
                                id="2" 
                                name="impact3" 
                                value={impact3}
                                checked={+impact3 === 2} 
                                onChange={(e) => setImpact3(e.target.checked ? e.target.id : 0)}
                            />
                        </td>
                        <td>
                            <span id="points">2 pts</span> - Clearly aligns with UMN Systemwide Strategic Plan, specifically the 
                            MNtersections initiative: 
                                <ul>
                                    <li>Drives innovation for next-generation health.</li>
                                    <li>Build a fully sustainable future.</li>
                                    <li>Advance natural resources and agro-food systems to elevate human security and potential.</li>
                                </ul>
                        </td>
                    </tr>
                </table>
            </form>

            <form>
                <table>
                    <tr>
                        <th colSpan="2">Final Recommendation</th>
                    </tr>
                    <tr id="first">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="3" 
                                name="recommendation" 
                                value={final_recommendation}
                                checked={final_recommendation === 3} 
                                onChange={recommendationRadioChange}
                            />
                        </td>
                        <td><span id="points">3 pts</span><span id="points"></span> - Proposal recommended for full funding.</td>
                    </tr>
                    <tr id="second">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="2" 
                                name="recommendation" 
                                value={final_recommendation}
                                checked={final_recommendation === 2}
                                onChange={recommendationRadioChange}
                            />
                        </td>
                        <td><span id="points">2 pts</span> - Proposal should be funded in accordance with available resources.</td>
                    </tr>
                    <tr id="last">
                        <td className="radio-td">
                            <input 
                                type="radio" 
                                id="0" 
                                name="recommendation" 
                                value={final_recommendation}
                                checked={final_recommendation === 0} 
                                onChange={recommendationRadioChange}
                            />
                        </td>
                        <td> 
                            <span id="points">0 pts</span> - Proposal not recommended for funding.
                        </td>
                    </tr>
                </table>
            </form>

            <p className='review-form-title'>Reviewer Comments</p>
                <textarea
                    rows="8"
                    placeholder='Required: Please provide a brief comment about this proposal.'
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />

            <br />

            <h4>Proposal Score <i className="score">{totalScore}</i></h4>

            <br />
            <br />
            <br />

            <button id="save-button" onClick={handleOpenSaveDialog}>SAVE</button> 
                <Dialog
                    open={openSaveDialog}
                    onClose={handleCloseSaveDialog}
                    aria-labelledby="responsive-dialog-title"
                    id="dialog-save"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {"Would you like to continue working or save your progress?"}
                    </DialogTitle>

                    <DialogActions>
                        <Button autoFocus id="responsive-dialog-button" onClick={handleCloseSaveDialog}>
                            Continue Review
                        </Button>
                        <Button autoFocus id="responsive-dialog-button2" onClick={saveScores}>
                            Save Progress
                        </Button>
                    </DialogActions>
                </Dialog>
            
            <button id="submit-button" onClick={handleOpenSubmitDialog}>SUBMIT</button>
                <Dialog
                    open={openSubmitDialog}
                    onClose={handleCloseSubmitDialog}
                    aria-labelledby="responsive-dialog-title"
                    id="dialog"
                    >
                    <DialogTitle id="responsive-dialog-title">
                        {"Are you sure you want to submit your review?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            WARNING: REVIEW CANNOT BE RETRIEVED ONCE SUBMITTED.
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            You can SAVE your progress instead.
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus id="responsive-dialog-button" onClick={handleCloseSubmitDialog}>
                            No, Continue Working
                        </Button>
                        <Button autoFocus id="responsive-dialog-button2" onClick={submitScores}>
                            Yes, Submit Review
                        </Button>
                    </DialogActions>
                </Dialog>
        </div>
    )
}

export default GrantReviewForm;

// Will go back to Reviewer Home Page 3.2
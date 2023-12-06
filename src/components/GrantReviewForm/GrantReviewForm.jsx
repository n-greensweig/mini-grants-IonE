// View 3.3 Reviewer View

// React
import React, { useState} from 'react';
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

    const user = useSelector((store) => store.user);
    const history = useHistory();

    const [interdisciplinary, setInterdisciplinary] = useState(null);
    const [goals, setGoals] = useState(null);
    const [method_and_design, setMethod_and_design] = useState(null);
    const [budget, setBudget] = useState(null);
    const [impact1, setImpact1] = useState(null);
    const [impact2, setImpact2] = useState(null);
    const [impact3, setImpact3] = useState(null);
    const [recommendation, setRecommendation] = useState(null);
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

    const impactSum = ((+impact1) + (+impact2) + (+impact3))

    const recommendationRadioChange = (event) => {
        setRecommendation(+event.target.id);
    };

    let totalScore = (interdisciplinary + method_and_design + budget + impactSum + recommendation);

    // Will need data from other components for created_at, grant_id, reviewer_id, and assigned_by
    let submittedScores = {
        created_at: "11-27-2023 1:03pm", // Test data
        grant_id: 1, // Test data
        reviewer_id: 1, // Test data
        assigned_by: 1, // Test data
        interdisciplinary: interdisciplinary,
        goals: goals,
        method_and_design: method_and_design,
        budget: budget,
        impact: impactSum,
        comments: comments,
        review_complete: true,
        // date/time_scored?
    };

    let savedScores = {
        created_at: "11-27-2023 1:03pm", // Test data
        grant_id: 1, // Test data
        reviewer_id: 1, // Test data
        assigned_by: 1, // Test data
        interdisciplinary: interdisciplinary,
        goals: goals,
        method_and_design: method_and_design,
        budget: budget,
        impact: impactSum,
        comments: comments,
        review_complete: false, 
        // date/time_scored?
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

    // End MUI 

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
                <p>{JSON.stringify(grantInfo)}</p>
                {/* Reviewer will be variable brought in from other components */}
                <h3>Hello, {user.fullName}</h3>
                <h3><span>Welcome </span><span><i>Reviewer</i></span></h3>
                <p>This form is unique to each reviewer. Please use the review guidance criteria for each category below to review the proposal.</p>
                
                <div id="title">

                    <div>
                        <h4><u>Project PI</u></h4>
                        {/* PI Name will be variable sourced from other components */}
                        <p>PI Name</p> 
                    </div>
                    <div>
                        <h4><u>Project Title</u></h4>
                        {/* Project Title will be variable sourced from other components */}
                        <p>Project Title</p>
                    </div>
                    <div>
                        <PDFDownloadLink document={<PDFDocument />} fileName="Replace.pdf">
                            {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download Grant PDF'
                            }
                        </PDFDownloadLink>
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
                                value={interdisciplinary} 
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
                                value="method_and_design" 
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
                                value="method_and_design" 
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
                                value="method_and_design" 
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
                                value="method_and_design" 
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
                                value="budget" 
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
                                value="budget" 
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
                                value="budget" 
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
                                value="budget" 
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
                                value="impact1" 
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
                                value="impact2" 
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
                                value="impact3" 
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
                                value={recommendation} 
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
                                value={recommendation} 
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
                                value={recommendation} 
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
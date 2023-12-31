//Imports
import React, { useState, useEffect } from 'react';
import './ReviewerForm.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ReviewerForm(){

    const history = useHistory();
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        grantsToReview: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'department') {
            setSelectedItems(value);
          }
        
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
      };

          //multi select drop down
            const fetchDepartments = () => {
                axios.get('/departments')
                .then(response => {
                    console.log("DB response", response.data);
                    setDepartments(response.data);
                })
                .catch(error => {
                    console.error('Error fetching departments', error);
                });
            };
            useEffect(() => {
                fetchDepartments();
            }, []);

    // Handle submit of form page
    function handleSubmit (event) {
        event.preventDefault();
        const dataToSubmit = {
            ...formData, 
            department: selectedItems
        }
        console.log('Form Data to be submitted', dataToSubmit);
        axios.post('/reviewer', dataToSubmit)
        .then((response) => {
            console.log(`Reviewer data has been submitted successfully`);
        }).catch(error => {
            console.log('Error submitting reviewer form data', error);
        });
        alert('Form has been submitted successfully');
        history.push('/reviewerhomepage');
    }
    
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectionChange = ({ target }) => {
        const selectedValue = target.value;
      
        if (!selectedItems.includes(selectedValue)) {
            setSelectedItems([...selectedItems, selectedValue]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== selectedValue));
        }
    };
    


    return (
        <>
        <div id='reviewer-view'>
        <div id='Reviewer-Card'>  
            <h2 id='reviewer-form-title'>Tell us about You and Your Academic Affiliations!</h2>
            <form onSubmit={handleSubmit}>
                {/* Department Affiliations */}
                <div id='department-affiliations'>
                    <label id='department-affiliation-label' htmlFor="multiSelect">Select Your Academic Affiliations:</label>
                    <br /> <br />
                    <select
                        id="multiSelect"
                        multiple
                        size={9}
                        onChange={handleSelectionChange}
                        value={selectedItems}
                    >
                        {departments.map(option => (
                        <option key={option.id} value={option.id} className='largerOptions'>
                            {option.name}
                        </option>
                        ))}
                    </select>
                    <div>
                    <p>Selected Departments: {selectedItems.map(itemId => {
                        const selectedDepartment = departments.find(department => department.id === parseInt(itemId, 10));
                        return selectedDepartment ? selectedDepartment.name : null;
                    }).filter(Boolean).join(', ')}</p>
                </div>
                </div>
                    <div>
                        <label>Quantity of Reviews this Cycle:</label>
                        <input
                        type="number"
                        id="grantsToReview"
                        name="grantsToReview"
                        value={formData.grantsToReview}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <br />
                <button id='reviewer-form-save-button' type="submit">Submit</button>
            </form>
        </div>
        </div>
        </>
      );
}

export default ReviewerForm;
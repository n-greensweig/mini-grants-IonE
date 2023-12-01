//Imports
import React, { useState } from 'react';
import './ReviewerForm.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function ReviewerForm(){

    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
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

    // Handle submit of form page
    function handleSubmit (event) {
        event.preventDefault();
        const dataToSubmit = {
            ...formData, 
            department: selectedItems
        }
        console.log('Form Data to be submitted', dataToSubmit);
        axios.post('/api/reviewerform', dataToSubmit)
        .then((response) => {
            console.log(`Reviewer data has been submitted successfully`);
        }).catch(error => {
            console.log('Error submitting reviewer form data', error);
        });
        // history.push('/reviewerhomepage')
    }

    //multi select drop down
    const options = ["Accounting", "Finance", "Information & Decision Sciences", "Marketing", "Strategic Management & Entrepreneurship", 
    "Supply Chain & Operations", "Work & Organizations", "Analytics for Good Institute", "Business Advancement Center for Health", 
    "Carlson Global Institute", "Center for Human Resources & Labor Studies", "Center for Integrative Leadership", "Gary S. Holmes Center for Entrepreneurship"];
    
    
    
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
        <div id='Reviewer-Card'>
            
        <h2>Please submit some information about you! </h2>

            <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                type="text"
                id="name"
                name="name"
                placeholder='Prince Nelson'
                value={formData.name}
                onChange={handleChange}
                required
                />
            </div>

        {/* Department Affiliations */}
        <div>
                <label htmlFor="multiSelect">Select any department affiliations:</label>
                <select
                    id="multiSelect"
                    multiple
                    onChange={handleSelectionChange}
                    value={selectedItems}
                >
                    {options.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
            <div>
                <p>Selected Departments: {selectedItems.join(', ')}</p>
            </div>
        </div>
        
            <div>
                <label>Grants to Review:</label>
                <input
                type="number"
                id="grantsToReview"
                name="grantsToReview"
                value={formData.grantsToReview}
                onChange={handleChange}
                required
                />
            </div>
        
            <button type="submit">Submit</button>
            </form>
        </div>
        </>
      );
}

export default ReviewerForm;
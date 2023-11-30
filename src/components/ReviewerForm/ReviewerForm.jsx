//Imports
import React, { useState } from 'react';
import './ReviewerForm.css';


function ReviewerForm(){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: 'NONE', 
        grantsToReview: 0,
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


    function handleSubmit (event) {
        event.preventDefault();

        console.log('Form Data', formData);
    }

    //multi select drop down
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"]; // Add your options here
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectionChange = (event) => {
    const selectedValue = event.target.value;

    if (!selectedItems.includes(selectedValue)) {
      setSelectedItems([...selectedItems, selectedValue]);
    } else {
      // If the item is already selected, remove it from the list
      setSelectedItems(selectedItems.filter(item => item !== selectedValue));
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
        
            <div>
                <label>Email Address:</label>
                <input
                type="email"
                id="email"
                name="email"
                placeholder='PriceNelson@umn.edu'
                value={formData.email}
                onChange={handleChange}
                required
                />
            </div>
        {/* Department Affiliations */}
        <div>
                <label htmlFor="multiSelect">Select any department affiliations:</label>
                <br />
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
                <p>Selected items: {selectedItems.join(', ')}</p>
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
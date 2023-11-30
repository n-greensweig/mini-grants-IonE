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


    function handleSubmit () {

    }

    return (
        <>
        <div id='Reviewer-Card'>

        <h2>Please submit some information about you! </h2>

            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
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
                <label htmlFor="email">Email Address:</label>
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
        
            <div>
                <label htmlFor="department">Department Affiliations:</label>
                <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                >
                {/* list of department options goes here */}
                <option value="department1">Department 1</option>
                <option value="department2">Department 2</option>
                </select>
            </div>
        
            <div>
                <label htmlFor="grantsToReview">Grants to Review:</label>
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
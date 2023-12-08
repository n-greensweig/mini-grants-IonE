import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Departments.css';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');

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


  const handleDelete = (departmentId) => {
    console.log(`Deleting department with ID: ${departmentId}`);
    axios.delete(`/departments/${departmentId}`)
      .then(() => {
        fetchDepartments();
      })
      .catch((error) => {
        console.log('Error deleting department', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Data to Submit:', newDepartment);
    axios.post('/departments', { name: newDepartment })
      .then(() => {
        fetchDepartments();
        setNewDepartment('');
      })
      .catch(error => {
        console.log('Error submitting department data', error);
      });
  };

  return (
    <>
      <div id='department-view'>
        <div id='department-view-header'>
          <h3 id='department-title'>Department Manager</h3>
          <p>Here you can modify the departments available to reviewers.</p>
        </div>
  
        <div id='department-content'>
          <div id='department-form-card'>
            <form id='department-form' onSubmit={handleSubmit}>
              <label htmlFor="add A Department">Add new Department</label>
              <input 
                id='department-input'
                type="text" 
                value={newDepartment}
                onChange={(event) => setNewDepartment(event.target.value)}
                placeholder='Department Name'
              />
              <button type='submit'>Add Department</button>
            </form>
          </div>
  
          <div id='department-list'>
            <ul>
              {departments.map(department => (
                <li id='department-list-item' key={department.id}>
                  <span>{department.name}</span>
                  <button id='department-delete-button' onClick={() => handleDelete(department.id)}>Delete</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}


export default Departments;

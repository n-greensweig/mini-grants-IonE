import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Departments.css';

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [editingDepartment, setEditingDepartment] = useState({ id: null, name: "" });

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
      <div>
        <div>
            <h3>Add A Department</h3>
        </div>
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={newDepartment}
            onChange={(event) => setNewDepartment(event.target.value)}
            placeholder='Department Name'
            />
            <button type='submit'>Add Department</button>
        </form>
    </div>
      <div>
        <h2>Department List</h2>
        <ul>
            {departments.map(department => (
                <li key={department.id}>
                    {department.name}
                    <button onClick={() => handleDelete(department.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
    </>
)
}


export default Departments;

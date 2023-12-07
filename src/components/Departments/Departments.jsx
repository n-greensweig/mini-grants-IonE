// imports
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Departments.css';

function Departments() {
  // States
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null); 

  // Fetch departments
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

  // Get all Departments on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  //EDIT departments
  const handleEdit = (departmentId) => {
    console.log(`Editing department with ID: ${departmentId}`);
    // Fetch the department by ID
    axios.get(`/departments/${departmentId}`)
      .then((response) => {
        const department = response.data;
        // Set the department to be edited in the state
        setEditingDepartment(department);
      })
      .catch((error) => {
        console.log('Error fetching department for edit', error);
      });
  };

  const handleCancelEdit = () => {
    // Clear the editing state when canceling edit
    setEditingDepartment(null);
  };

  const handleSaveEdit = () => {
    // Assuming 'editingDepartment' has the updated information
    const updatedDepartment = {
        id: editingDepartment.id,
        name: editingDepartment.name,

    };
    axios.put(`/departments/${updatedDepartment.id}`, updatedDepartment)
        .then(() => {
        console.log('Department updated successfully');
        fetchDepartments();
        }).catch((error) => {
        console.log('Error updating department', error);
        }).then(() => {
        setEditingDepartment(null);
        });
  };

  //Delete Department
  const handleDelete = (departmentId) => {
    console.log(`Deleting department with ID: ${departmentId}`);
    axios.delete(`/departments/${departmentId}`)
      .then(() => {
        fetchDepartments(); // Refetch departments after deletion
      })
      .catch((error) => {
        console.log('Error deleting department', error);
      });
  };

  // ADD new department
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    console.log('Data to Submit:', newDepartment);

    axios.post('/departments', { name: newDepartment })
      .then(() => {
        fetchDepartments(); // Refetch departments after adding a new one
        setNewDepartment(''); // Clear the input field after submission
      })
      .catch(error => {
        console.log('Error submitting department data', error);
      });
  };

  return (
    <>
      <div>
        {editingDepartment ? (
          <>
            <h3>Edit Department</h3>
            <form onSubmit={handleSaveEdit}>
              <input
                type="text"
                value={editingDepartment.name}
                onChange={(event) => setEditingDepartment({ ...editingDepartment, name: event.target.value })}
                placeholder='Department Name'
              />
              <button type='button' onClick={handleCancelEdit}>Cancel</button>
              <button type='submit'>Save Changes</button>
            </form>
          </>
        ) : (
          <>
            <h3>Add A Department</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={newDepartment}
                onChange={(event) => setNewDepartment(event.target.value)}
                placeholder='Department Name'
              />
              <button type='submit'>Add Department</button>
            </form>
          </>
        )}
      </div>
      <div>
        <h2>Department List</h2>
        <ul>
          {departments.map(department => (
            <li key={department.id}>
              {department.name}
              <button onClick={() => handleEdit(department.id)}>Edit</button>
              <button onClick={() => handleDelete(department.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
  

export default Departments;
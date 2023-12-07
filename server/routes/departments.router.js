const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all departments
router.get('/', (req, res) => {
  pool.query(
    'SELECT * FROM "departments"'
  )
  .then((result) => {
    const departments = result.rows;
    res.send(departments);
  })
  .catch((error) => {
    console.error('Error fetching departments', error);
    res.status(500).json({ error: 'An error occurred while fetching departments' });
  });
});

// POST a new department
router.post('/', (req, res) => {
  const { name } = req.body;

  pool.query(
    'INSERT INTO "departments" ("name") VALUES ($1)',
    [name]
  )
  .then(result => {
    res.status(201).json({ message: 'Department added successfully', name });
  })
  .catch(error => {
    console.error('Error adding department', error);
    res.status(500).json({ error: 'An error occurred while adding the department' });
  });
});

// DELETE a department by ID
router.delete('/:id', (req, res) => {
  const departmentId = req.params.id;

  pool.query(
    'DELETE FROM "departments" WHERE id = $1',
    [departmentId]
  )
  .then((result) => {
    res.status(204).json({ message: 'Department deleted successfully' });
  })
  .catch((error) => {
    console.error('Error deleting department', error);
    res.status(500).json({ error: 'An error occurred while deleting the department' });
  });
});

// Update Route
router.put('/:id', (req, res) => {
  const departmentId = req.params.id;
  const { name } = req.body;

  pool.query(
    'UPDATE "departments" SET "name" = $1 WHERE "id" = $2',
    [name, departmentId]
  )
  .then((result) => {
    res.json({ message: 'Department updated successfully' });
  })
  .catch((error) => {
    console.error('Error updating department', error);
    res.status(500).json({ error: 'An error occurred while updating the department' });
  });
});

module.exports = router;
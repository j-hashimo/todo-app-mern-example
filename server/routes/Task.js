//DELETE THIS FILE


const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// @route   GET api/task
// @desc    Get all tasks for a user
// @access  Private
router.get('/', getTasks);

// @route   POST api/task
// @desc    Create a new task
// @access  Private
router.post('/', createTask);

// @route   PUT api/task/:id
// @desc    Update an existing task
// @access  Private
router.put('/:id', updateTask);

// @route   DELETE api/task/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', deleteTask);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

// @route   GET api/task
// @desc    Get all tasks for a user
// @access  Private
router.get('/', auth, getTasks);

// @route   POST api/task
// @desc    Create a new task
// @access  Private
router.post('/', auth, createTask);

// @route   PUT api/task/:id
// @desc    Update an existing task
// @access  Private
router.put('/:id', auth, updateTask);

// @route   DELETE api/task/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, deleteTask);

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllTodoLists, createTodoList, deleteTodoList, createTask, deleteTask } = require('../controllers/todoListController');

// @route   GET api/todoList
// @desc    Get all user's todo lists
// @access  Public
router.get('/', auth, getAllTodoLists);

// @route   POST api/todoList
// @desc    Add new todo list
// @access  Public
router.post('/', auth, createTodoList);

// @route   DELETE api/todoList/:id
// @desc    Delete todo list
// @access  Public
router.delete('/:id', auth, deleteTodoList);

// @route   POST api/todoList/:id/task
// @desc    Add new task to a todo list
// @access  Public
router.post('/:id/task', auth, createTask);

// @route   DELETE api/todoList/:id/task/:taskId
// @desc    Delete a task from a todo list
// @access  Public
router.delete('/:id/task/:taskId', auth, deleteTask);

module.exports = router;
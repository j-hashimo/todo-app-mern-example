const express = require('express');
const router = express.Router();
const { getAllTodoLists, createTodoList, deleteTodoList, createTask, deleteTask } = require('../controllers/todoListController');

// @route   GET api/todoList
// @desc    Get all user's todo lists
// @access  Public
router.get('/', getAllTodoLists);

// @route   POST api/todoList
// @desc    Add new todo list
// @access  Public
router.post('/', createTodoList);

// @route   DELETE api/todoList/:id
// @desc    Delete todo list
// @access  Public
router.delete('/:id', deleteTodoList);

// @route   POST api/todoList/:id/task
// @desc    Add new task to a todo list
// @access  Public
router.post('/:id/task', createTask);

// @route   DELETE api/todoList/:id/task/:taskId
// @desc    Delete a task from a todo list
// @access  Public
router.delete('/:id/task/:taskId', deleteTask);

module.exports = router;

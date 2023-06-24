const TodoList = require('../models/TodoList');


// Function to get all todo lists
exports.getAllTodoLists = async (req, res) => {
    try {
        const todoLists = await TodoList.find({ user: req.user.id });
        res.json(todoLists);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
};


// Function to create a new todo list
exports.createTodoList = async (req, res) => {
    const { title } = req.body;
    try {
        const newTodoList = new TodoList({
            title,
            user: req.user.id // include the user ID
        });

        const todoList = await newTodoList.save();

        res.json(todoList);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
};

// Function to delete a todo list and all its tasks
exports.deleteTodoList = async (req, res) => {
    try {
        let todoList = await TodoList.findOne({ _id: req.params.id, user: req.user.id });
        if (!todoList) return res.status(404).json({ msg: 'Todo list not found' });

        await TodoList.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Todo list deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
};

// Function to create a new task within a todo list
exports.createTask = async (req, res) => {
    const { description } = req.body;
    try {
        let todoList = await TodoList.findOne({ _id: req.params.id, user: req.user.id });
        if (!todoList) return res.status(404).json({ msg: 'Todo list not found' });

        todoList.tasks.push({ description });

        await todoList.save();

        res.json(todoList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error', error: err.message });
    }
};

// Function to delete a task within a todo list
exports.deleteTask = async (req, res) => {
    try {
      let todoList = await TodoList.findOne({ _id: req.params.id, user: req.user.id });
      if (!todoList) return res.status(404).json({ msg: 'Todo list not found' });
  
      const taskId = req.params.taskId;
      // Use pull to remove the task from the tasks array
      todoList.tasks.pull({_id: taskId});
  
      await todoList.save();
  
      res.json(todoList);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Server Error', error: err.message });
    }
  };

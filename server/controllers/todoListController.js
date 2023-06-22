const TodoList = require('../models/TodoList');

// Function to get all todo lists
exports.getAllTodoLists = async (req, res) => {
    try {
        const todoLists = await TodoList.find();
        res.json(todoLists);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Function to create a new todo list
exports.createTodoList = async (req, res) => {
    const { title } = req.body; //in order to allow this destructuring, need to have app.use(express.json()); before routes in index.js file
    try {
        const newTodoList = new TodoList({
            title
        });

        const todoList = await newTodoList.save();

        res.json(todoList);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

// Function to delete a todo list
// Function to delete a todo list and all its tasks
exports.deleteTodoList = async (req, res) => {
    try {
        let todoList = await TodoList.findById(req.params.id);
        if (!todoList) return res.status(404).json({ msg: 'Todo list not found' });

        await TodoList.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Todo list deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Function to create a new task within a todo list
exports.createTask = async (req, res) => {
    const { description } = req.body;
    try {
        let todoList = await TodoList.findById(req.params.id);
        if (!todoList) return res.status(404).json({ msg: 'Todo list not found' });

        todoList.tasks.push({ description });

        await todoList.save();

        res.json(todoList);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Function to delete a task within a todo list
exports.deleteTask = async (req, res) => {
    try {
      let todoList = await TodoList.findById(req.params.id);
      if (!todoList) return res.status(404).json({ msg: 'Todo list not found' });
  
      const taskId = req.params.taskId;
      // Use pull to remove the task from the tasks array
      todoList.tasks.pull({_id: taskId});
  
      await todoList.save();
  
      res.json(todoList);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  };
  
  
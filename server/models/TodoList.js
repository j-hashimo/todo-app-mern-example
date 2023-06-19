const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const TodoListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    tasks: [TaskSchema],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TodoList', TodoListSchema);

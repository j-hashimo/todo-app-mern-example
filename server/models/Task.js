const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    todoList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TodoList'
    },
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

module.exports = mongoose.model('Task', TaskSchema);

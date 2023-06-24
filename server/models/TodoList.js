const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    description: {
        type: String,
        required: true
    }
});

const TodoListSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tasks: [TaskSchema]
});

module.exports = mongoose.model('TodoList', TodoListSchema);

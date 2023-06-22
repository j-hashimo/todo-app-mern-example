import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, toggleTaskCompletion } from '../features/todoListSlice';

function TodoList({ todoList }) {
  const dispatch = useDispatch();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleNewTask = (event) => {
    if (event.key === 'Enter' && newTaskTitle.trim() !== '') {
      dispatch(addTask({ todoListId: todoList._id, title: newTaskTitle, description: newTaskTitle }));
      setNewTaskTitle('');
    }
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask({ todoListId: todoList._id, taskId: taskId }));
  };

  const handleCheckTask = (taskId) => {
    dispatch(toggleTaskCompletion({ todoListId: todoList._id, taskId }));
  };

  return (
    <div className="bg-gray-700 rounded p-4 mt-4">
      <h2 className="text-2xl">{todoList.title}</h2>
      {todoList.tasks.map((task) => (
        <div className="flex justify-between items-center bg-gray-700 rounded p-2 mt-2" key={task._id}>
          <input
            type="checkbox"
            onChange={() => handleCheckTask(task._id)}
            checked={task.isCompleted}
            className="form-checkbox h-5 w-5 text-green-500 mr-2"
          />
          <p className={`${task.isCompleted ? 'line-through' : ''}`}>{task.description}</p>
          <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
            Delete
          </button>
        </div>
      ))}
      <input
        type="text"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        onKeyPress={handleNewTask}
        className="form-input mt-2 w-full text-black"
        placeholder="New task..."
      />
    </div>
  );
}

export default TodoList;

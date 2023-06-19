import React from 'react';

function TodoList({ todoList }) {
  return (
    <div className="dark bg-gray-700 p-4 rounded-lg mb-4">
      <h2 className="text-xl">{todoList.title}</h2>
      <ul>
        {todoList.tasks.map(task => (
          <li key={task._id}>
            <div className={`p-2 rounded ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
              {task.description}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

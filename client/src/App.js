import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';

function App() {
  const [todoLists, setTodoLists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/todoList');
      setTodoLists(result.data);
    }
    fetchData();
  }, []);

  return (
    <div className="dark bg-gray-800 min-h-screen p-10 text-white">
      <h1 className="text-3xl mb-4">To-Do Lists</h1>
      {todoLists.map(todoList => (
        <TodoList key={todoList._id} todoList={todoList} />
      ))}
    </div>
  );
}

export default App;


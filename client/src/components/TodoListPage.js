import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodoLists, selectAllTodoLists, addTodoList } from '../features/todoListSlice';
import TodoList from '../components/TodoList';
import { logout, selectToken } from '../features/authSlice';
import axios from 'axios';

const TodoListsPage = () => {
  const dispatch = useDispatch();
  const todoLists = useSelector(selectAllTodoLists);
  const token = useSelector(selectToken); // Select token from store

  useEffect(() => {
    console.log('Token:', token); // Check the token value in console

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Append token to axios headers
    dispatch(fetchTodoLists());
  }, [dispatch, token]); // Added token as a dependency
  
  const handleNewTodoList = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      const config = { 
        headers: { 
          'Content-Type': 'application/json',
          'x-auth-token': token
        } 
      };
      dispatch(addTodoList({title: event.target.value, config}));
      event.target.value = '';
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    axios.defaults.headers.common['Authorization'] = null; // Remove token from headers after logout
  };

  return (
    <div className="dark bg-gray-800 min-h-screen p-10 text-white">
      <h1 className="text-3xl mb-4 text-white">To-Do Lists</h1>
      <button 
        className="w-full p-3 rounded bg-blue-500 text-white mb-4" 
        onClick={handleLogout}
      >
        Logout
      </button>
      <input
        className="bg-gray-700 rounded p-2 mb-4"
        type="text"
        placeholder="New list..."
        onKeyDown={handleNewTodoList}
      />
      {todoLists.map(todoList => (
        <TodoList key={todoList._id} todoList={todoList} />
      ))}
    </div>
  );
}

export default TodoListsPage;

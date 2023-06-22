import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodoLists, selectAllTodoLists, addTodoList } from './features/todoListSlice';
import TodoList from './components/TodoList';

function App() {
  const dispatch = useDispatch();
  const todoLists = useSelector(selectAllTodoLists);

  useEffect(() => {
    dispatch(fetchTodoLists());
  }, [dispatch]);
  const handleNewTodoList = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      dispatch(addTodoList(event.target.value));
      event.target.value = '';
    }
  };

  return (
    <div className="dark bg-gray-800 min-h-screen p-10 text-white">
      <h1 className="text-3xl mb-4 text-white">To-Do Lists</h1>
      
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

export default App;

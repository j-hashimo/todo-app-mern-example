import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import TodoListPage from './components/TodoListPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="dark bg-gray-800 min-h-screen p-10 text-white">
        <h1 className="text-3xl mb-4 text-white">Login</h1>
        <LoginForm />
        <h1 className="text-3xl mb-4 text-white">Sign Up</h1>
        <SignupForm />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/todolists" />} />
        <Route path="/todolists" element={<TodoListPage />} />
      </Routes>
    </Router>
  );
}

export default App;

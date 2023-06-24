import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { registerStart, registerSuccess, registerFailure } from '../features/authSlice';

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(registerStart());
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('http://localhost:5000/api/users/signup', { email, password }, config);
      dispatch(registerSuccess(data));
      console.log("Data returned from backend:", data);
    } catch (err) {
      dispatch(registerFailure(err.message));
      console.error("Error occurred:", err);
    }
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
    console.log("Email input:", e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    console.log("Password input:", e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <div className="bg-gray-800 p-5 rounded-lg mt-5">
      <h2 className="text-white text-2xl mb-5">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="w-full p-3 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-3 rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button type="submit" className="w-full p-3 rounded bg-blue-500 text-white">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;

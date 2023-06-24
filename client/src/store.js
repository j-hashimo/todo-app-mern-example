// store.js

import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from './features/todoListSlice';
import authReducer from './features/authSlice';

export default configureStore({
  reducer: {
    todoList: todoListReducer,
    auth: authReducer
  },
});


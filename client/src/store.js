import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from './features/todoListSlice';

export default configureStore({
  reducer: {
    todoList: todoListReducer,
  },
});

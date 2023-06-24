import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodoLists = createAsyncThunk(
  'todoList/fetchTodoLists',
  async (_, { getState }) => {
    const token = getState().auth.token;
    const config = { 
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token
      } 
    };
    const response = await axios.get('http://localhost:5000/api/todoList', config);
    return response.data;
  }
);

export const addTodoList = createAsyncThunk(
  'todoList/addTodoList',
  async ({title}, { getState }) => {
    const token = getState().auth.token;
    const config = { 
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token
      } 
    };
    const response = await axios.post('http://localhost:5000/api/todoList', { title }, config);
    return response.data;
  }
);

export const deleteTodoList = createAsyncThunk(
  'todoList/deleteTodoList',
  async (id, { getState }) => {
    const token = getState().auth.token;
    const config = { 
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token
      } 
    };
    await axios.delete(`http://localhost:5000/api/todoList/${id}`, config);
    return id;
  }
);

export const toggleTaskCompletion = createAsyncThunk(
  'todoList/toggleTask', 
  async (payload, { getState }) => {
    const token = getState().auth.token;
    const config = { 
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token
      } 
    };
    const response = await axios.patch(
      `http://localhost:5000/api/todoList/${payload.todoListId}/task/${payload.taskId}`, 
      config
    );
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'todoList/deleteTask', 
  async (payload, { getState }) => {
    const token = getState().auth.token;
    const config = { 
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token
      } 
    };
    const response = await axios.delete(
      `http://localhost:5000/api/todoList/${payload.todoListId}/task/${payload.taskId}`, 
      config
    );
    return response.data;
  }
);

export const addTask = createAsyncThunk(
  'todoList/addTask', 
  async (payload, { getState }) => {
    const token = getState().auth.token;
    const config = { 
      headers: { 
        'Content-Type': 'application/json',
        'x-auth-token': token
      } 
    };
    const response = await axios.post(
      `http://localhost:5000/api/todoList/${payload.todoListId}/task`, 
      {
        description: payload.description,
      }, 
      config
    );
    return response.data;
  }
);

const todoListSlice = createSlice({
  name: 'todoList',
  initialState: { todoLists: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodoLists.fulfilled, (state, action) => {
        state.todoLists = action.payload;
      })
      .addCase(addTodoList.fulfilled, (state, action) => {
        state.todoLists.push(action.payload);
      })
      .addCase(deleteTodoList.fulfilled, (state, action) => {
        state.todoLists = state.todoLists.filter((todoList) => todoList._id !== action.payload);
      })
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        const { todoListId, taskId, completed } = action.payload;
        const todoList = state.todoLists.find((list) => list._id === todoListId);
        const task = todoList.tasks.find((task) => task._id === taskId);
        task.completed = completed;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const todoList = state.todoLists.find(todoList => todoList._id === action.meta.arg.todoListId);
        if (todoList) {
          // Replace the tasks array with the one received from the server
          todoList.tasks = action.payload.tasks;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const todoList = state.todoLists.find(todoList => todoList._id === action.meta.arg.todoListId);
        if (todoList) {
          // Replace the tasks array with the one received from the server
          todoList.tasks = action.payload.tasks;
        }
      });
  },
});

export const selectAllTodoLists = (state) => state.todoList.todoLists;

export default todoListSlice.reducer;

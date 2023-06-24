// redux/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const selectUser = state => state.users; 
export const register = createAsyncThunk('users/register', async ({ name, email, password }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ name, email, password });

    const res = await axios.post('http://localhost:5000/api/users', body, config);

    return res.data;
});

export const login = createAsyncThunk('http://localhost:5000/api/users/login', async ({ email, password }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ email, password });

    const res = await axios.post('http://localhost:5000/api/users/login', body, config);

    return res.data;
});

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.token);
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.token);
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.loading = false;
            });
    },
});

export default userSlice.reducer;

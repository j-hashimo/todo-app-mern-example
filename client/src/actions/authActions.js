import axios from 'axios';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
};

// Login User
export const loginUser = (userData) => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', userData);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    });

    await dispatch(loadUser());
    return Promise.resolve();  // Successfully logged in
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: err.response.data
    });
    return Promise.reject(err);  // There was an error
  }
};

// Signup User
export const signupUser = (userData) => async dispatch => {
  try {
    const res = await axios.post('/api/users/signup', userData);

    dispatch({
      type: 'SIGNUP_SUCCESS',
      payload: res.data
    });

    await dispatch(loadUser());
    return Promise.resolve();  // Successfully signed up
  } catch (err) {
    dispatch({
      type: 'SIGNUP_FAIL',
      payload: err.response.data
    });
    return Promise.reject(err);  // There was an error
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: 'LOGOUT' });
};

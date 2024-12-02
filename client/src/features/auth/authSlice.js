import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, signInUser, signOutUser } from './authAPI';


// Initial State
const initialState = {
  loggedInUser: null,
  status: "pending",
  error: ''
};


// Async Handler
export const createUserAsync = createAsyncThunk(
  'auth/create',
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const signInUserAsync = createAsyncThunk(
  'auth/login',
  async (data, {rejectWithValue}) => {
    try {
      const response = await signInUser(data);
      console.log(response,'user exist')
      return response;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const signOutUserAsync = createAsyncThunk(
  'auth/logout',
  async (data) => {
    const response = await signOutUser();
    return response;
  }
);



// Auth Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => { //create user
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.loggedInUser = action.payload;
      })
      .addCase(signInUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.loggedInUser = action.payload;
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.loggedInUser = action.payload;
      });
  },
});


// Selectors
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectLoginStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;

// Auth  Reducer
export default authSlice.reducer;

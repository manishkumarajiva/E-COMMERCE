import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser } from './authAPI';

const initialState = {
  loggedInUser: { email: '', password: '', confirmPassword: '' },
  status: "pending",
  error :''
};


export const createUserAsync = createAsyncThunk(
  'user/create',
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);


export const checkUserAsync = createAsyncThunk(
  'user/check',
  async (userInfo) => {
    const response = await checkUser(userInfo);
    return response;
  }
);


export const signInUserAsync = createAsyncThunk(
  'user/login',
  async (data) => {
    const response = await createUser(data);
    return response;
  }
);


export const signOutUserAsync = createAsyncThunk(
  'product/logout',
  async (data) => {
    const response = await createUser(data);
    return response;
  }
);

export const authSlice = createSlice({
  name: 'user',
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
      }).addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = 'User Not Found, invalid credentials'+action.error;
      }).addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.loggedInUser = action.payload;
      });
  },
});


export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state)=> state.auth.error;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUser, checkUser, updateUser, signOutUser } from './authAPI';

const initialState = {
  loggedInUser: { email: '', password: '', confirmPassword: '', address : [] },
  status: "pending",
  error :''
};


export const createUserAsync = createAsyncThunk(
  'auth/create',
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);


export const updateUserAsync = createAsyncThunk(
  'auth/update',
  async (userData) => {
    const response = await updateUser(userData);
    return response;
  }
);


export const checkUserAsync = createAsyncThunk(
  'auth/check',
  async (userInfo) => {
    const response = await checkUser(userInfo);
    return response;
  }
);


export const signInUserAsync = createAsyncThunk(
  'auth/login',
  async (data) => {
    const response = await createUser(data);
    return response;
  }
);


export const signOutUserAsync = createAsyncThunk(
  'auth/logout',
  async (data) => {
    const response = await signOutUser();
    return response;
  }
);

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
      }).addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = 'User Not Found, invalid credentials'+action.error;
      }).addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.loggedInUser = action.payload;
      }).addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.loggedInUser = action.payload;
      }).addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.loggedInUser = action.payload;
      });
  },
});


export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state)=> state.auth.error;
export default authSlice.reducer;

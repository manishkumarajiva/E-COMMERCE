import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SignUpUser, SignInUser, SignOutUser } from './authAPI';


const initialState = {
  loggedInUser: null,
  status: "pending",
  error: ''
};


export const SignUpUserAsync = createAsyncThunk(
  'auth/create',
  async (userData) => {
    const response = await SignUpUser(userData);
    return response;
  }
);

export const SignInUserAsync = createAsyncThunk(
  'auth/login',
  async (data, {rejectWithValue}) => {
    try {
      const response = await SignInUser(data);
      return response;
    } catch (error) {
      return rejectWithValue(error)
    }
  }
);

export const SignOutUserAsync = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await SignOutUser();
    return response;
  }
);



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignUpUserAsync.pending, (state) => { 
        state.status = 'pending';
      })
      .addCase(SignUpUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loggedInUser = action.payload;
      })
      .addCase(SignInUserAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(SignInUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loggedInUser = action.payload;
      })
      .addCase(SignOutUserAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(SignOutUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loggedInUser = action.payload;
      });
  }
});



export const selectloggedInUser = (state) => state.auth.loggedInUser;
export const selectLoginStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;


export default authSlice.reducer;

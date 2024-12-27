import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SignUpUser, SignInUser, SignOutUser, CheckAuth } from './authAPI';


const initialState = {
  loggedInUser: false,
  authChecked: false,
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
  async (data) => {
      const response = await SignInUser(data);
      return response;   
  }
);

export const SignOutUserAsync = createAsyncThunk(
  'auth/logout',
  async () => {
    const response = await SignOutUser();
    return response;
  }
);

export const checkAuthAsync = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await CheckAuth();
    return response;
  }
)



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignUpUserAsync.pending, (state) => { 
        state.status = 'pending';
        state.authChecked = true;
      })
      .addCase(SignUpUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loggedInUser = action.payload.response;
        state.authChecked = true;
      })
      .addCase(SignInUserAsync.pending, (state) => {
        state.status = 'pending';
        state.authChecked = true;
      })
      .addCase(SignInUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.loggedInUser = action.payload.response;
        state.authChecked = true;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = 'pending'
        state.authChecked = false
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'fullfilled';
        state.loggedInUser = action.payload;
        state.authChecked = true
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'rejected';
        state.authChecked = false
      })
      .addCase(SignOutUserAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(SignOutUserAsync.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.authChecked =  action.payload;
        state.loggedInUser = false
      });
  }
});



export const selectloggedInUser = (state) => state.auth.loggedInUser;
export const selectAuthChecked = (state) => state.auth.authChecked;
export const selectLoginStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;


export default authSlice.reducer;












// export const SignInUserAsync = createAsyncThunk(
//   'auth/login',
//   async (data, {rejectWithValue}) => {
//     try {
//       const response = await SignInUser(data);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error)
//     }
//   }
// );

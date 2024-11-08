import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLoggedInUser, getUserOrder, updateUser, deleteUser } from './userAPI';

const initialState = {
  userInfo: null,
  orders:[],
  status:'pending'
};


export const getLoggedInUserAsync = createAsyncThunk(
  'user/get',
  async (userId) => {
    const response = await getLoggedInUser(userId);
    return response;
  }
)


export const getUserOrderAsync = createAsyncThunk(
  'user/order',
  async (userId) => {
    const response = await getUserOrder(userId);
    return response;
  }
)


export const updateUserAsync = createAsyncThunk(
  'user/update',
  async (userData) => {
    const response = await updateUser(userData);
    return response;
  }
)


export const deleteUserAsync = createAsyncThunk(
  'user/delete',
  async (user) => {
    const response = await deleteUser(user);
    return response;
  }
)




export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLoggedInUserAsync.pending, (state) => { 
        state.status = 'pending';
      })
      .addCase(getLoggedInUserAsync.fulfilled, (state, action) => { 
        state.status = 'success';
        state.userInfo = action.payload;
      })
      .addCase(getUserOrderAsync.rejected, (state) => { 
        state.status = 'pending';
      })
      .addCase(getUserOrderAsync.fulfilled, (state, action) => { 
        state.status = 'success';
        state.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => { 
        state.status = 'pending';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => { 
        state.status = 'success';
        state.orders = action.payload;
      })
      .addCase(deleteUserAsync.pending, (state) => { 
        state.status = 'pending';
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => { 
        state.status = 'success';
        console.log(action.payload)
        
      })
  },
});


export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserOrders = (state) => state.user.orders;

export default userSlice.reducer;

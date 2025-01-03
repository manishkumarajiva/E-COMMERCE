import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLoggedInUser, updateUser } from './userAPI';
import { getUserOrder } from '../order/orderAPI';

const initialState = {
  userInfo: null,
  orders:[],
  status:'pending'
};


export const getLoggedInUserAsync = createAsyncThunk(
  'user/get',
  async () => {
    const response = await getLoggedInUser();
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
        state.status = 'fulfilled';
        state.userInfo = action.payload.response;
      })
      .addCase(getUserOrderAsync.rejected, (state) => { 
        state.status = 'rejected';
      })
      .addCase(getUserOrderAsync.fulfilled, (state, action) => { 
        state.status = 'fulfilled';
        state.orders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => { 
        state.status = 'pending';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => { 
        state.status = 'fullfilled';
        state.userInfo = action.payload;
      })
  },
});




export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserOrders = (state) => state.user.orders;
export const selectUserOrderStatus = (state) => state.user.status;


export default userSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLoggedInUser } from './admnAPI';
import { fetchAllOrder } from '../order/orderAPI';
import { updateOrderStatusAsync } from '../order/orderSlice';

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
    const response = await fetchAllOrder();
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
      .addCase(updateOrderStatusAsync.pending, (state) => { 
        state.status = 'pending';
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => { 
        state.status = 'success';
        state.userInfo = action.payload;
      })
  },
});


export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserOrders = (state) => state.user.orders;

export default userSlice.reducer;

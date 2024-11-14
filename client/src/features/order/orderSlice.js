import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrder } from './orderAPI';

const initialState = {
  orders: [],
  orderCount : 0,
  currentOrder : null,
  status: 'pending'
};


export const createOrderAsync = createAsyncThunk(
  'order/create',
  async (order) => {
    const response = await createOrder(order);
    return response;
  }
);

export const getAllOrderAsync = createAsyncThunk(
  'order/getAll',
  async (paginagion) => {
    const response = await fetchAllOrder(paginagion);
    return response;
  }
)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(getAllOrderAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getAllOrderAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.orders = action.payload;
      })
  },
});

export const { resetCurrentOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrders = (state) => state.order.orders;

export default orderSlice.reducer;

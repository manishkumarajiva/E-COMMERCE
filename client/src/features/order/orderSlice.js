import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrder, updateOrderStatus } from './orderAPI';


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
  async ({paginagion, sort}) => {
    const response = await fetchAllOrder(paginagion, sort);
    return response;
  }
)


export const updateOrderStatusAsync = createAsyncThunk(
  'order/update',
  async (order) => {
    const response = await updateOrderStatus(order);
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
        state.status = 'fullfilled';
        state.orders = action.payload;
        state.orderCount = action.payload.response.length;
        state.currentOrder = action.payload.currOrder;
      })
      .addCase(getAllOrderAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getAllOrderAsync.fulfilled, (state, action) => {
        state.status = 'fullfilled';
        state.orders = action.payload.order;
        state.orderCount = action.payload.total;
      })
      .addCase(updateOrderStatusAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateOrderStatusAsync.fulfilled, (state, action) => {
        state.status = 'fullfilled';
        state.orders = action.payload;
        // const index = state.orders.findIndex(order => order.id === action.payload.id);
        // state.orders[index] = action.payload;
      })
  },
});

export const { resetCurrentOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrders = (state) => state.order.orders;
export const selectTotalOrder = (state) => state.order.orderCount;

export default orderSlice.reducer;

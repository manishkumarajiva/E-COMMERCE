import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProduct } from './productListAPI';

const initialState = {
 products : [],
};


export const incrementAsync = createAsyncThunk(
  'product/fetch',
  async () => {
    const response = await fetchProduct();
    return response.data;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment } = productSlice.actions;

export const selectCount = (state) => state.counter.value;

export default productSlice.reducer;

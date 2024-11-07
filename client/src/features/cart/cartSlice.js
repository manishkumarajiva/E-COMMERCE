import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCartItems, addToCart, updateCartItem, deleteCartItem, resetCartItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};


export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response;
  }
);


export const fetchCartItemsAsync = createAsyncThunk(
  'cart/fetchCartItems',
  async (id) => {
    const response = await fetchCartItems(id);
    return response;
  }
);



export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async (item) => {
    const response = await updateCartItem(item);
    return response;
  }
);



export const deleteCartItemAsync = createAsyncThunk(
  'cart/deleteCartItem',
  async (itemId) => {
    const response = await deleteCartItem(itemId);
    return response;
  }
);



export const removeCartItemAsync = createAsyncThunk(
  'order/resetCart',
  async (userId) => {
    const response = await resetCartItem(userId);
    return response;
  }
);



export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'fulfill';
        state.items.push(action.payload)
      })
      .addCase(fetchCartItemsAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCartItemsAsync.fulfilled, (state, action) => {
        state.status = 'fulfill';
        state.items = action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = 'fulfill';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = 'fulfill';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(removeCartItemAsync.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.items = state.items.length = 0;
      })

  },
});


export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
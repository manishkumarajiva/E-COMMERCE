import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProductById, getFilteredProduct, getCategory, getBrand, createProduct } from './productAPI';


const initialState = {
  productDetails: null,
  products: [],
  totalProduct: 0,
  categories: [],
  brands: [],
  status: 'pending',
  error: ''
};


// create section

export const createProductAsync = createAsyncThunk(
  'product/create',
  async (product) => {
    const newProduct = await createProduct(product);
    return newProduct;
  }
)


// fetch section
export const getCategoryList = createAsyncThunk(
  'product/getCategories',
  async () => {
    const response = await getCategory();
    return response;
  }
);

export const getBrandList = createAsyncThunk(
  'product/getBrands',
  async () => {
    const response = await getBrand();
    return response;
  }
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (id) => {
    const response = await getProductById(id);
    return response;
  }
);

export const getFilteredProductList = createAsyncThunk(
  'product/getProducts',
  async ({ filter, sort, pagination }) => {
    const response = await getFilteredProduct(filter, sort, pagination);
    return response;
  }
);



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetails = action.payload;
        state.status = 'fulfilled'
      }).addCase(getFilteredProductList.fulfilled, (state, action) => {
        state.products = action.payload.product;
        state.totalProduct = action.payload.total;
        state.status = 'fulfilled'
      }).addCase(getCategoryList.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'fulfilled'
      }).addCase(getBrandList.fulfilled, (state, action) => {
        state.brands = action.payload;
        state.status = 'fulfilled'
      }).addCase(createProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload)
        state.status = 'fulfilled'
      });
  },
});


export const productDetail = (state) => state.product.productDetails;
export const selectAllProduct = (state) => state.product.products;
export const totalProducts = (state) => state.product.totalProduct;
export const categoryList = (state) => state.product.categories;
export const brandList = (state) => state.product.brands;


export default productSlice.reducer;

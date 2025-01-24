import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({page, limit}) => {
    const response = await fetch(
      `https://fakestoreapi.com/products?_page=${page}&_limit=${limit}`,
    );
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length === 0) {
          state.hasMore = false; // No more products to load
        } else {
          state.products = [...state.products, ...action.payload]; // Append new products
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;

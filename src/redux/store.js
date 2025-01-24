import {configureStore} from '@reduxjs/toolkit';
import ProductSlice from './ProductSlice';
import cartSlice from './cartSlice';
import favoriteSlice from './favouriteSlice';

const store = configureStore({
  reducer: {
    products: ProductSlice,
    cart: cartSlice,
    favorites: favoriteSlice,
  },
});

export default store;

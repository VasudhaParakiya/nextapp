import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "../features/shoppingcart/productCartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;


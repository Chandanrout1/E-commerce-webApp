import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import adminProductSlice from "./admin/products-slice/index.js";
import shopProductSlice from "./shop/product-slice/index.js";
import shopCartSlice from "./shop/cart-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
  },
});

export default store;

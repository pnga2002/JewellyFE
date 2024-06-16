import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";
import categoryReducer from "./reducer/categoryReducer";
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";
export const store = configureStore({
    reducer: {
        productReducer:productReducer,
        categoryReducer:categoryReducer,
        authReducer:authReducer,
        cartReducer:cartReducer
    },
});

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";
import categoryReducer from "./reducer/categoryReducer";
import authReducer from "./reducer/authReducer";
import cartReducer from "./reducer/cartReducer";
import orderReducer from "./reducer/orderReducer";
export const store = configureStore({
    reducer: {
        productReducer:productReducer,
        categoryReducer:categoryReducer,
        authReducer:authReducer,
        cartReducer:cartReducer,
        orderReducer:orderReducer,
        cartReducer:cartReducer
    },
});

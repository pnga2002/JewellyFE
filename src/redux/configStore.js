import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/productReducer";
import categoryReducer from "./reducer/categoryReducer";
export const store = configureStore({
    reducer: {
        productReducer:productReducer,
        categoryReducer:categoryReducer
    },
});

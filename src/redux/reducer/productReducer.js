import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../utils/config';

const initialState = {
    lstProduct : null,
    productDetail: null
}

const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    getAllProductAction:(state,action)=>{
        state.lstProduct = action.payload
    },
    getAllProductDetailAction:(state,action)=>{
        state.productDetail = action.payload
    }
  }
});

export const {getAllProductAction, getAllProductDetailAction} = productReducer.actions

export default productReducer.reducer
export const getAllProductApi = () => {
    return async dispatch => {
        try {
            const result = await http.get("/api/products")
            dispatch(getAllProductAction(result.data))
        } catch (error) {

        }
    }
}
export const getAllProductDetailApi = (id) => {
    return async dispatch => {
        try {
            const result = await http.get(`/api/products/${id}`)
            dispatch(getAllProductDetailAction(result.data))
        } catch (error) {

        }
    }
}
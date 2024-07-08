import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../utils/config';
import { message } from 'antd';

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
export const getAllProductCategoryApi = (id) => {
    return async dispatch => {
        try {
            const result = await http.get(`/api/products/category/${id}`)
            dispatch(getAllProductAction(result.data))
        } catch (error) {

        }
    }
}
export const delProductApi = (id) => {
    return async dispatch => {
        try {
            const result = await http.delete(`/api/products/${id}`)
            dispatch(getAllProductApi())
            message.success("Xóa thành công")
        } catch (error) {
            // message.error("Lỗi báo IT")
        }
    }
}
export const updateProductApi = (obj) => {
    return async dispatch => {
        try {
            const result = await http.put(`/api/products/${obj.idProduct}`,obj)
            dispatch(getAllProductApi())
            message.success("Cập nhật thành công")
        } catch (error) {
            message.error("Lỗi báo IT")
        }
    }
}
export const addProductApi = (obj) => {
    return async dispatch => {
        try {
            const result = await http.post(`/api/products`,obj)
            dispatch(getAllProductApi())
            message.success("Thêm mới thành công")
        } catch (error) {
            message.error("Lỗi báo IT")
        }
    }
}
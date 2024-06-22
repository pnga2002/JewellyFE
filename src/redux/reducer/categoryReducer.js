import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../utils/config';
import { message } from 'antd';

const initialState = {
    lstCate : null
}

const categoryReducer = createSlice({
  name: 'categoryReducer',
  initialState,
  reducers: {
    getAllCateAction:(state,action)=>{
        state.lstCate = action.payload
    }
  }
});

export const {getAllCateAction} = categoryReducer.actions

export default categoryReducer.reducer
export const getAllCateApi = () => {
    return async dispatch => {
        try {
            const result = await http.get("/api/categories")
            dispatch(getAllCateAction(result.data))
        } catch (error) {

        }
    }
}
export const delCateApi = (id) => {
    return async dispatch => {
        try {
            const result = await http.delete(`/api/categories/${id}`)
            dispatch(getAllCateApi())
            message.success("Xóa thành công")
        } catch (error) {
            message.error("Lỗi báo IT")
        }
    }
}
export const updateCateApi = (obj) => {
    return async dispatch => {
        try {
            const result = await http.put(`/api/categories/${obj.idCategory}`,obj)
            dispatch(getAllCateApi())
            message.success("Cập nhật thành công")
        } catch (error) {
            message.error("Lỗi báo IT")
        }
    }
}
export const addCateApi = (obj) => {
    return async dispatch => {
        try {
            const result = await http.post(`/api/categories`,obj)
            dispatch(getAllCateApi())
            message.success("Thêm mới thành công")
        } catch (error) {
            message.error("Lỗi báo IT")
        }
    }
}
import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../utils/config';

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
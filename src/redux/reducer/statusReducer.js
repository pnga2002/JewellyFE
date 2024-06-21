import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../utils/config';
import { message } from 'antd';

const initialState = {
    lstStatus:[]
}

const statusReducer = createSlice({
  name: 'statusReducer',
  initialState,
  reducers: {
    getStatusAction: (state, action) => {
        state.lstStatus = action.payload;
      },
  }
});

export const {
    getStatusAction

} = statusReducer.actions

export default statusReducer.reducer
export const getAllStatusApi = () => {
    return async (dispatch) => {
      try {
        const result = await http.get(`/api/status`);
        dispatch(getStatusAction(result.data));
      } catch (error) {
        message.error("Lỗi báo IT");
      }
    };
  };
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
export const delStatusApi = (id) => {
  return async dispatch => {
      try {
          const result = await http.delete(`/api/status/${id}`)
          dispatch(getAllStatusApi())
          message.success("Xóa thành công")
      } catch (error) {
        message.warning("Có đơn hàng chưa xử lý, vui lòng xử lý đơn hàng trước khi xóa trạng thái này!")
      }
  }
}
export const updateStatusApi = (obj) => {
  return async dispatch => {
      try {
          const result = await http.put(`/api/status/${obj.idStatus}`,obj)
          dispatch(getAllStatusApi())
          message.success("Cập nhật thành công")
      } catch (error) {
          message.error("Lỗi báo IT")
      }
  }
}
export const addStatusApi = (obj) => {
  return async dispatch => {
      try {
          const result = await http.post(`/api/status`,obj)
          dispatch(getAllStatusApi())
          message.success("Thêm mới thành công")
      } catch (error) {
          message.error("Lỗi báo IT")
      }
  }
}
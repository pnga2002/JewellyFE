import { createSlice } from '@reduxjs/toolkit'
import { getStoreJson, http } from '../../utils/config';
import { message } from 'antd';
import { getAllCartApi } from './cartReducer';

const initialState = {
    lstOrder:[]
}

const orderReducer = createSlice({
  name: 'orderReducer',
  initialState,
  reducers: {
    getOrderUser: (state, action) => {
        state.lstOrder = action.payload;
      },
  }
});

export const {
    getOrderUser
} = orderReducer.actions

export default orderReducer.reducer
// 
export const addOrderApi = (obj) => {
    return async (dispatch) => {
      await http
        .post("/api/orderdetails", obj)
        .then((res) => {
          let userInfor = getStoreJson("user_infor")
          message.success("Đặt hàng thành công");
          dispatch(getAllCartApi(userInfor.idUser));
        })
        .catch((er) => {
          message.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    };
  };
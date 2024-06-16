import { createSlice } from '@reduxjs/toolkit'
import { getStoreJson, http } from '../../utils/config';
import { message } from 'antd';
import { getAllCartApi } from './cartReducer';

const initialState = {
    lstOrder:[],
    detailOrder:[]

}

const orderReducer = createSlice({
  name: 'orderReducer',
  initialState,
  reducers: {
    getOrderUser: (state, action) => {
        state.lstOrder = action.payload;
      },
    getOrderDetaiUser: (state, action) => {
        state.detailOrder = action.payload;
      },
  }
});

export const {
    getOrderUser,
    getOrderDetaiUser
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
export const getAllOrderByUserIdApi = (id) => {
    return async (dispatch) => {
      await http
        .get(`/api/order/user/${id}`)
        .then((res) => {
          dispatch(getOrderUser(res.data));
        })
        .catch((er) => {
          message.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    };
  };
export const getOrderDetailApi = (id) => {
    return async (dispatch) => {
      await http
        .get(`/api/orderdetails/order/${id}`)
        .then((res) => {
          dispatch(getOrderDetaiUser(res.data));
        })
        .catch((er) => {
          message.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    };
  };
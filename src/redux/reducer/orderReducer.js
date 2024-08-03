import { createSlice } from '@reduxjs/toolkit'
import { getStoreJson, http } from '../../utils/config';
import { message } from 'antd';
import { getAllCartApi } from './cartReducer';

const initialState = {
  allOrder:[],
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
    getAllOrder: (state, action) => {
        state.allOrder = action.payload;
      },
  }
});

export const {
    getOrderUser,
    getOrderDetaiUser,
    getAllOrder
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
export const addOrderPaymentApi = (obj) => {
    return async (dispatch) => {
      await http
        .post("/api/orderdetails/thanhToan", obj)
        .then((res) => {
          window.location.href = res.data
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
export const getAllOrderApi = (id) => {
    return async (dispatch) => {
      await http
        .get(`/api/order`)
        .then((res) => {
          dispatch(getAllOrder(res.data));
        })
        .catch((er) => {
          message.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    };
  };
export const updateOrderObjApi = (obj) => {
    return async (dispatch) => {
      await http
        .put(`/api/order/${obj.idOrder}`,obj)
        .then((res) => {
          message.success("Cập nhật trạng thái đơn hàng thành công")
          // dispatch(getAllOrder(res.data));
        })
        .catch((er) => {
          message.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    };
  };
export const updateOrderApi = (obj) => {
    return async (dispatch) => {
      await http
        .put(`/api/order/update`,obj)
        .then((res) => {
          message.success("Cập nhật trạng thái đơn hàng thành công")
          // dispatch(getAllOrder(res.data));
        })
        .catch((er) => {
          message.error("Có lỗi xảy ra, vui lòng thử lại");
        });
    };
  };
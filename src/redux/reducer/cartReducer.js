import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { getStoreJson, http } from "../../utils/config";

const initialState = {
  lstCart: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    getCartUser: (state, action) => {
      state.lstCart = action.payload;
    },
  },
});

export const { getCartUser } = cartReducer.actions;

export default cartReducer.reducer;
export const getAllCartApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await http.get(`/api/cart-details/user/${id}`);
      dispatch(getCartUser(result.data));
    } catch (error) {
      message.error("Lỗi báo IT");
    }
  };
};
export const addToCartApi = (obj) => {
  return async (dispatch) => {
    await http
      .post("/api/cart-details", obj)
      .then((res) => {
        let userInfor = getStoreJson("user_infor")
        message.success("Thêm giỏ hàng thành công");
        dispatch(getAllCartApi(userInfor.idUser));
      })
      .catch((er) => {
        message.error("Có lỗi xảy ra, vui lòng thử lại");
      });
  };
};

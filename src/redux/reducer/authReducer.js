import { createSlice } from "@reduxjs/toolkit";
import { getStoreJson, http, luuStore, luuStoreJson } from "../../utils/config";
import { history } from "../../App";
import toast from "react-hot-toast";
import { message } from "antd";

const initialState = {
  userInfor: getStoreJson("user_infor"),
  allUser:[]
}
const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUserInforAction: (state, action) => {
      state.userInfor = action.payload;
    },
    setAllUserAction: (state, action) => {
      state.allUser = action.payload;
    },
  },
});

export const { 
  setUserInforAction,
  setAllUserAction
 } = authReducer.actions;

export default authReducer.reducer;
export const loginApi = (model) => {
  return async (dispatch) => {
    await http
      .post("/api/users/login", model)
      .then((res) => {
        dispatch(setUserInforAction(res.data.infor));
        luuStoreJson("user_infor", res.data.infor);
        message.success("Đăng nhập thành công");
        history.push("/");
      })
      .catch((er) => {
        console.log(er);
        message.error("Đăng nhập thất bại");
      });
  };
};
export const getAllUserApi = () => {
  return async (dispatch) => {
    await http
      .get("/api/users")
      .then((res) => {
        dispatch(setAllUserAction(res.data));
      })
      .catch((er) => {
        message.error("Lỗi báo IT");
      });
  };
};
export const delUserApi = (id) => {
  return async dispatch => {
      try {
          const result = await http.delete(`/api/users/${id}`)
          dispatch(getAllUserApi())
          message.success("Xóa thành công")
      } catch (error) {
        message.warning("Người dùng có đơn hàng chưa xử lý, vui lòng xử lý đơn hàng trước khi xóa!")
      }
  }
}
export const updateUserApi = (obj) => {
  return async dispatch => {
      try {
          const result = await http.put(`/api/users/${obj.idUser}`,obj)
          dispatch(getAllUserApi())
          message.success("Cập nhật thành công")
      } catch (error) {
          message.error("Lỗi báo IT")
      }
  }
}
export const addUserApi = (obj) => {
  return async dispatch => {
      try {
          const result = await http.post(`/api/users`,obj)
          dispatch(getAllUserApi())
          message.success("Thêm mới thành công")
      } catch (error) {
          message.error("Lỗi báo IT")
      }
  }
}
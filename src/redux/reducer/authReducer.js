import { createSlice } from "@reduxjs/toolkit";
import { getStoreJson, http, luuStore, luuStoreJson } from "../../utils/config";
import { history } from "../../App";
import toast from "react-hot-toast";
import { message } from "antd";

const initialState = {
  userInfor: getStoreJson("user_infor"),
};

const authReducer = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    setUserInforAction: (state, action) => {
      state.userInfor = action.payload;
    },
  },
});

export const { setUserInforAction } = authReducer.actions;

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

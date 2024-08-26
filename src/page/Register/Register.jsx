import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../Login/login.css'
import { useDispatch } from 'react-redux';
import { addUserApi, loginApi, register } from '../../redux/reducer/authReducer';
const Register = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    const obj ={
        "idUser": 0,
        "username": values.username,
        "password": values.password,
        "email": values.email,
        "role": "user",
        "phoneNumber": values.phoneNumber,
        "address": ""
      }
    console.log(values)
    dispatch(register(obj))
    
  };
  return (
    <div className="login_container">
        <div className="containerr">
  <div className="screen">
    <div className="screen__content">
    <Form
      name="login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Vui lòng nhập username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Mật khẩu"
        />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
      >
        <Input
        //   prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Số điện thoại"
        />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input
        //   prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item>
        <button  className="button login__submit" loading={loading}>
          tạo tài khoản
        </button>
      </Form.Item>
    </Form>
      <div className="social-login">
        <h3>log in via</h3>
        <div className="social-icons">
          <a href="#" className="social-login__icon fab fa-instagram" />
          <a href="#" className="social-login__icon fab fa-facebook" />
          <a href="#" className="social-login__icon fab fa-twitter" />
        </div>
      </div>
    </div>
    <div className="screen__background">
      <span className="screen__background__shape screen__background__shape4" />
      <span className="screen__background__shape screen__background__shape3" />		
      <span className="screen__background__shape screen__background__shape2" />
      <span className="screen__background__shape screen__background__shape1" />
    </div>		
  </div>
</div>
    </div>

  )
}

export default Register
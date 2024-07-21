import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.css'
import { useDispatch } from 'react-redux';
import { loginApi } from '../../redux/reducer/authReducer';
const Signin = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    dispatch(loginApi(values))
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
        rules={[{ required: true, message: 'Please input your Username or Email!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username / Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <button  className="button login__submit" loading={loading}>
          Log In Now
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

export default Signin
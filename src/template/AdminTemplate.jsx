import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { history } from '../App';
const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{minHeight:'100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          items={[
            {
              key: '1',
              label: <div class="logo_container" onClick={() => { 
                history.push("/")
               }}><a><span style={{color:'green'}}>c29</span><span>shop</span></a></div>,
            },
            {
              key: 'admin/nguoi-dung',
              icon: <UserOutlined />,
              label: <NavLink to="nguoi-dung">Người Dùng</NavLink>,
            },
            {
                key: '3',
                icon: <i className="fa-sharp fa-regular fa-rings-wedding"></i>,
                label: <NavLink to="san-pham">Sản phẩm</NavLink>,
            },
            {
                key: '4',
                icon: <i className="fa-solid fa-cart-shopping"></i>,
                label: <NavLink to="don-hang">Đơn hàng</NavLink>,
            },
            {
                key: '5',
                icon: <i className="fa-sharp fa-solid fa-layer-group"></i>,
                label: <NavLink to="phan-loai">Phân loại</NavLink>,
            },
            {
                key: '6',
                icon: <i className="fa-sharp fa-solid fa-arrow-progress"></i>,
                label: <NavLink to="trang-thai">Trạng thái</NavLink>,
            },
            {
                key: '7',
                icon: <i className="fa-solid fa-rotate"></i>,
                label: <NavLink >Đổi mật khẩu</NavLink>,
            },
            {
                key: '8',
                icon: <i className="fa-solid fa-right-from-bracket"></i>,
                label: <NavLink to="login">Đăng xuất</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminTemplate;
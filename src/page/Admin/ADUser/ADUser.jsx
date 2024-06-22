import React, { useEffect, useState } from 'react'

import { Table, Tag, Space, Button, Avatar, Popconfirm, Form, Modal, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addUserApi, delUserApi, getAllUserApi, updateUserApi } from '../../../redux/reducer/authReducer';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ADUser = () => {

  const { allUser } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    dispatch(delUserApi(id))
  }
  //post and put
  const [user, setUser] = useState()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    form.resetFields()
    setUser()
    setOpen(false)
  }
  const [form] = Form.useForm();
  const validateMessages = {
    required: '${label} chưa nhập !!',
  };
  const handleEdit = (obj) => {
    form.setFieldsValue(obj)
    setUser(obj)
    setOpen(true)
  }
  const onSubmit = async (values) => {
    if (user) {
      dispatch(updateUserApi(values))
      handleClose()
    }
    else {
      console.log(values)
      dispatch(addUserApi(values))
      handleClose()
    }
  }
  useEffect(() => {
    dispatch(getAllUserApi())
  }, [])
  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (_, rec, idx) => <a>{idx + 1}</a>,
    },
    {
      title: 'User',
      dataIndex: 'username',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={`https://ui-avatars.com/api/?name=${text}&background=random&bold=true`} />
          <span>{text}</span>
        </Space>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Quyền',
      dataIndex: 'role',
      key: 'role',
      render: (_, rec, idx) => <Tag color='blue-inverse' style={{ textTransform: "capitalize" }}>{_}</Tag>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Action',
      dataIndex: 'idUser',
      key: 'action',
      render: (id, record) => (
        <Space>
          <Button type="primary" shape="circle" onClick={() => {
            handleEdit(record)
          }} icon={<EditOutlined />} />
          <Popconfirm
            title={<p className="">Xóa người dùng này?</p>}
            description="Chắc chắn muốn xoá người dùng này ?"
            onConfirm={() => handleDelete(id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>

        </Space>
      )
    }
  ];
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className=''>Quản lý người dùng</h4>
        <button className='newsletter_submit_btn rounded' onClick={handleOpen}>Thêm mới</button>
      </div>
      <Table columns={columns} dataSource={allUser} rowKey={record => record.idUser} />
      <Modal title={user ? "Chỉnh sửa" : "Thêm mới"} open={open} onCancel={handleClose} onOk={form.submit}>
        {/* "idUser": 3,
        "username": "Peter",
        "password": "password123",
        "email": "peter@example.com",
        "role": "admin",
        "phoneNumber": "1234567890",
        "address": "123 Main St, Anytown, USA" */}
        <Form enctype="multipart/form-data" wrapperCol={{ span: 24 }} size="large" layout="vertical" form={form} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
          {user &&
            <Form.Item name='idUser' label="Mã người dùng" rules={[{ required: false }]} >
              <Input disabled={true} />
            </Form.Item>}

          <Form.Item name="username" label="Tên" rules={[{ required: true }]} tooltip="This is a required field">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email', message: 'The input is not valid E-mail!' }]} tooltip="This is a required field">
            <Input />
          </Form.Item>
        <Form.Item name="role" label="Quyền" rules={[{ required: true }]} tooltip="This is a required field">
          <Select
            options={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
              { value: "employ", label: "Nhân viên" },
            ]}
          />
        </Form.Item>
        <Form.Item name="phoneNumber" label="Số điện thoại" rules={[{ required: true }]} tooltip="This is a required field">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]} tooltip="This is a required field">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu" rules={[{ required: true }]} tooltip="This is a required field">
          <Input type='password' disabled={user?true:false}/>
        </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ADUser
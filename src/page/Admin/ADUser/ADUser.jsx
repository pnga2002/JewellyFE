import React, { useEffect } from 'react'

import { Table, Tag, Space, Button, Avatar } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserApi } from '../../../redux/reducer/authReducer';
const ADUser = () => {
    
    const { allUser } = useSelector((state) => state.authReducer);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllUserApi())
    },[])
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
          render: (_, rec, idx) => <Tag color='blue-inverse' style={{textTransform:"capitalize"}}>{_}</Tag>,
        },
        {
          title: 'Địa chỉ',
          dataIndex: 'address',
          key: 'address'
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space>
              <Button type="primary" shape="circle" icon={<EyeOutlined />} />
              <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
            </Space>
          )
        }
      ];
  return (
    <div>
        <h4 className='mb-3'>Quản lý người dùng</h4>
        <Table columns={columns} dataSource={allUser}rowKey={record => record.idUser} />
    </div>
  )
}

export default ADUser
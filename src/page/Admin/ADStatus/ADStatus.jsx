import { Button, Space, Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllStatusApi } from '../../../redux/reducer/statusReducer';
const ADStatus = () => {
  const { lstStatus } = useSelector((state) => state.statusReducer)
  const dispatch = useDispatch()
  const columns = [
    {
        title: 'STT',
        key: 'stt',
        render: (_, rec, idx) => <a>{idx + 1}</a>,
      },
    {
        title: 'Tên phân loại',
        dataIndex: 'name',
        key: 'name',
        render: (prod) => <p>{prod}</p>,
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
  useEffect(()=>{
    dispatch(getAllStatusApi())
  },[])
  return (
    <div>
    <h4 className='mb-3'>Quản lý trạng thái</h4>
    <Table columns={columns} dataSource={lstStatus}rowKey={record => record.idStatus} />
</div>
  )
}

export default ADStatus




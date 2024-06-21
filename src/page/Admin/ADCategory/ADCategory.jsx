import { Button, Space, Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllCateApi } from '../../../redux/reducer/categoryReducer';
const ADCategory = () => {
  const { lstCate } = useSelector((state) => state.categoryReducer)
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
    dispatch(getAllCateApi())
  },[])
  return (
    <div>
    <h4 className='mb-3'>Quản lý phân loại</h4>
    <Table columns={columns} dataSource={lstCate}rowKey={record => record.idCategory} />
</div>
  )
}

export default ADCategory
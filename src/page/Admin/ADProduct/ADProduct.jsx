import { Button, Space, Table, Tag } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllProductApi } from '../../../redux/reducer/productReducer'

const ADProduct = () => {
    
    const { lstProduct } = useSelector((state) => state.productReducer)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getAllProductApi())
    },[])
    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (_, rec, idx) => <a>{idx + 1}</a>,
          },
        {
          title: 'Sản phẩm',
          dataIndex: 'imageUrl',
          key: 'imageUrl',
          width:'200px',
          render: (prod) => <img  style={{width:'200px'}} src={prod} alt="" />
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (prod) => <p>{prod}</p>,
          },
          {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (prod) => <p>{prod.length>50?prod.substring(0,50)+" ...":prod}</p>,
          },
        {
          title: 'Phân loại',
          dataIndex: 'category',
          key: 'category',
          render:(text)=><Tag color='cyan-inverse' >{text.name}</Tag>
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            key: 'giaTien',
            render: (prod) => <p>{(prod*1000).toLocaleString()}</p>,
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
         <h4 className='mb-3'>Quản lý sản phẩm</h4>
         <Table columns={columns} dataSource={lstProduct}rowKey={record => record.idProduct} />
    </div>
  )
}

export default ADProduct
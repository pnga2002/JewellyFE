import { Button, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { addProductApi, delProductApi, getAllProductApi, updateProductApi } from '../../../redux/reducer/productReducer'
import { getAllCateApi } from '../../../redux/reducer/categoryReducer';

const ADProduct = () => {

  const { lstProduct } = useSelector((state) => state.productReducer)
  const { lstCate } = useSelector((state) => state.categoryReducer)

  //upadte && post new
  const [product, setProduct] = useState()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    form.resetFields()
    setProduct()
    setOpen(false)
  }
  const [form] = Form.useForm();
  const validateMessages = {
    required: '${label} chưa nhập !!',
  };
  const handleEdit = (obj) => {
    form.setFieldsValue(obj)
    form.setFieldValue("idCategory",obj.category.idCategory)
    setProduct(obj)
    setOpen(true)
  }
  const onSubmit = async (values) => {
    if(product){
      const newobj={
        "idProduct": values.idProduct,
        "name": values.name,
        "description": values.description,
        "price": values.price,
        "imageUrl": values.imageUrl,
        "category": {
          "idCategory": values.idCategory
        }
      }
      dispatch(updateProductApi(newobj))
      handleClose()
    }
    else{
      const newobj={
        "idProduct": 0,
        "name": values.name,
        "description": values.description,
        "price": values.price,
        "imageUrl": values.imageUrl,
        "category": {
          "idCategory": values.idCategory
        }
      }
      dispatch(addProductApi(newobj))
      handleClose()
    }
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCateApi())
    dispatch(getAllProductApi())
  }, [])
  
  const handleDelete = (id) => {
    dispatch(delProductApi(id))
  }
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
      width: '200px',
      render: (prod) => <img style={{ width: '200px' }} src={prod} alt="" />
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
      render: (prod) => <p>{prod.length > 50 ? prod.substring(0, 50) + " ..." : prod}</p>,
    },
    {
      title: 'Phân loại',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <Tag color='cyan-inverse' >{text.name}</Tag>
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'giaTien',
      render: (prod) => <p>{(prod * 1000).toLocaleString()}</p>,
    },
    {
      title: 'Action',
      dataIndex: 'idProduct',
      key: 'action',
      render: (id, record) => (
        <Space>
          <Button type="primary" shape="circle" onClick={() => {
            handleEdit(record)
          }} icon={<EditOutlined />} />
          <Popconfirm
            title={<p className="">Xóa sản phẩm này?</p>}
            description="Chắc chắn muốn xoá sản phẩm này ?"
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
        <h4 className=''>Quản lý sản phẩm</h4>
        <button className='newsletter_submit_btn rounded' onClick={handleOpen}>Thêm sản phẩm</button>
      </div>
      <Table columns={columns} dataSource={lstProduct} rowKey={record => record.idProduct} />
      <Modal title={product?"Chỉnh sửa sản phẩm":"Thêm mới sản phẩm"} open={open} onCancel={handleClose} onOk={form.submit}>
        <Form enctype="multipart/form-data" wrapperCol={{ span: 24 }} size="large" layout="vertical" form={form} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
          {product &&
            <Form.Item name='idProduct' label="Product ID" rules={[{ required: false }]} >
              <Input disabled={true} />
            </Form.Item>}

          <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]} tooltip="This is a required field">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Mô tả" rules={[{ required: true }]} tooltip="This is a required field">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="price" label="Giá bán" rules={[{ required: true }]} tooltip="This is a required field">
            <Input type='number' />
          </Form.Item>
          <Form.Item name="imageUrl" label="Url hình ảnh" rules={[{ required: true }]} tooltip="This is a required field">
            <Input />
          </Form.Item>
          <Form.Item name="idCategory" label="Phân loại" rules={[{ required: true }]} tooltip="This is a required field">
            <Select
              options={lstCate?.map((item,idx)=>{
                return {
                  value: item.idCategory,
                  label: item.name
                }
              })}
    />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ADProduct
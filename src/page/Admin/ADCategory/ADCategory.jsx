import { Button, Form, Input, Modal, Popconfirm, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { addCateApi, delCateApi, getAllCateApi, getSearchCateApi, updateCateApi } from '../../../redux/reducer/categoryReducer';
const { Search } = Input;
const ADCategory = () => {
  const { lstCate } = useSelector((state) => state.categoryReducer)
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    dispatch(delCateApi(id))
  }
   //post and put
   const [cate, setCate] = useState()
   const [open, setOpen] = useState(false)
   const [search, setSearch] = useState('')
   const handleOpen = () => {
     setOpen(true)
   }
 
   const handleClose = () => {
     form.resetFields()
     setCate()
     setOpen(false)
   }
   const [form] = Form.useForm();
   const validateMessages = {
     required: '${label} chưa nhập !!',
   };
   const handleEdit = (obj) => {
     form.setFieldsValue(obj)
     setCate(obj)
     setOpen(true)
   }
   const onSubmit = async (values) => {
     if(cate){
       dispatch(updateCateApi(values))
       handleClose()
     }
     else{
       console.log(values)
       dispatch(addCateApi(values))
       handleClose()
     }
   }
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
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (prod) => <p>{prod}</p>,
      },
    {
      title: 'Action',
      dataIndex: 'idCategory',
      key: 'action',
      render: (id, record) => (
        <Space>
          <Button type="primary" shape="circle" onClick={() => {
            handleEdit(record)
          }} icon={<EditOutlined />} />
          <Popconfirm
            title={<p className="">Xóa phân loại này?</p>}
            description="Chắc chắn muốn xoá phân loại này ?"
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
  const onSearch=(e) => { 
    setSearch(e)
   }
  useEffect(()=>{
    dispatch(getSearchCateApi(search))
  },[search])
  return (
    <div>
    <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className=''>Quản lý phân loại</h4>
        <button className='newsletter_submit_btn rounded' onClick={handleOpen}>Thêm mới</button>
      </div>
      <div>
      <Search className='mb-1'
          placeholder="Tìm kiếm tên"
          onSearch={onSearch}
          style={{
              width: 300,
          }}
      />
      </div>
    <Table columns={columns} dataSource={lstCate}rowKey={record => record.idCategory} />
    <Modal title={cate?"Chỉnh sửa":"Thêm mới"} open={open} onCancel={handleClose} onOk={form.submit}>
        <Form enctype="multipart/form-data" wrapperCol={{ span: 24 }} size="large" layout="vertical" form={form} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
          {cate &&
            <Form.Item name='idCategory' label="Phân loại ID" rules={[{ required: false }]} >
              <Input disabled={true} />
            </Form.Item>}

          <Form.Item name="name" label="Tên" rules={[{ required: true }]} tooltip="This is a required field">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
</div>
  )
}

export default ADCategory
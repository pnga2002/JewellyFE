import { Button, Form, Input, Modal, Popconfirm, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { addStatusApi, delStatusApi, getAllStatusApi, getSearchStatusApi, updateStatusApi } from '../../../redux/reducer/statusReducer';
const { Search } = Input;
const ADStatus = () => {
  const { lstStatus } = useSelector((state) => state.statusReducer)
  const dispatch = useDispatch()
  const handleDelete = (id) => {
    dispatch(delStatusApi(id))
  }

  //post and put
  
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState()
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    form.resetFields()
    setStatus()
    setOpen(false)
  }
  const [form] = Form.useForm();
  const validateMessages = {
    required: '${label} chưa nhập !!',
  };
  const handleEdit = (obj) => {
    form.setFieldsValue(obj)
    setStatus(obj)
    setOpen(true)
  }
  const onSubmit = async (values) => {
    if(status){
      dispatch(updateStatusApi(values))
      handleClose()
    }
    else{
      console.log(values)
      dispatch(addStatusApi(values))
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
        dataIndex: 'idStatus',
        key: 'action',
        render: (id, record) => (
          <Space>
            <Button type="primary" shape="circle" onClick={() => {
              handleEdit(record)
            }} icon={<EditOutlined />} />
            <Popconfirm
              title={<p className="">Xóa trạng thái này?</p>}
              description="Chắc chắn muốn xoá trạng thái này ?"
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
    dispatch(getSearchStatusApi(search))
  },[search])
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className=''>Quản lý trạng thái</h4>
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
    <Table columns={columns} dataSource={lstStatus}rowKey={record => record.idStatus} />
    <Modal title={status?"Chỉnh sửa":"Thêm mới"} open={open} onCancel={handleClose} onOk={form.submit}>
        <Form enctype="multipart/form-data" wrapperCol={{ span: 24 }} size="large" layout="vertical" form={form} name="nest-messages" onFinish={onSubmit} validateMessages={validateMessages}>
          {status &&
            <Form.Item name='idStatus' label="Trạng thái ID" rules={[{ required: false }]} >
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

export default ADStatus




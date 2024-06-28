import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrderApi, getOrderDetailApi, updateOrderApi } from '../../../redux/reducer/orderReducer';
import { Modal, Select, Table } from 'antd';
import { getAllStatusApi } from '../../../redux/reducer/statusReducer';
import moment from 'moment';

const { Option } = Select;

const ADOrder = () => {
  const { lstStatus } = useSelector((state) => state.statusReducer);
  const { allOrder, detailOrder } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllOrderApi());
    dispatch(getAllStatusApi());
  }, [dispatch]);
  
  const handleStatusChange = (idOrder, idStatus) => {
    dispatch(updateOrderApi({ idOrder, idStatus })).then(() => {
      dispatch(getAllOrderApi());
    });
  };

  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (_, rec, idx) => <a>{idx + 1}</a>,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      render: (prod) => <p>{prod}</p>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (prod) => <p>{prod}</p>,
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (prod) => <p>{moment(prod).format('DD-MM-YYYY HH:mm:ss')}</p>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (prod, record) => {
        return (
          <Select value={prod.idStatus} style={{ width: 200 }} onChange={(value) => handleStatusChange(record.idOrder, value)}>
            {lstStatus.map(item => <Option key={item.idStatus} value={item.idStatus}>{item.name}</Option>)}
          </Select>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, rec) => (
        <p style={{ cursor: 'pointer' }} onClick={() => setOpenModal(rec.idOrder)}>
          <i className="fa-regular fa-eye"></i>
        </p>
      ),
    }
  ];

  const columns2 = [
    {
      title: 'STT',
      key: 'stt',
      render: (_, rec, idx) => <a>{idx + 1}</a>,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'image',
      render: (prod) => <img className='w-50 h-50' src={prod?.imageUrl} alt="" />,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'product',
      key: 'name',
      render: (prod) => <p>{prod.name}</p>,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity) => <p>{quantity}</p>,
    },
    {
      title: 'Giá tiền',
      dataIndex: 'product',
      key: 'price',
      render: (prod) => <p>{prod.price.toLocaleString()}</p>,
    },
    {
      title: 'Tổng tiền',
      key: 'total',
      render: (_, rec) => <p>{(rec.product.price * rec.quantity).toLocaleString()}</p>,
    }
  ];

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const setOpenModal = (id) => {
    setOpen(true);
    dispatch(getOrderDetailApi(id));
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={allOrder}
        rowKey={record => record.idOrder}
      />
      <Modal width={'70%'} title={<p className='text-center'>Chi tiết đơn hàng</p>} visible={open} onCancel={onClose} footer={null}>
        <div>
          <h5>Thông tin người nhận</h5>
        </div>
        <Table
          columns={columns2}
          dataSource={detailOrder}
          rowKey={record => record.idOrderDetail}
        />
      </Modal>
    </div>
  );
};

export default ADOrder;

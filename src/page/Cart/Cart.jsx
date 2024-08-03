import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartApi } from '../../redux/reducer/cartReducer';
import { Input, Modal, Space, Table, message } from 'antd';
import { addOrderApi, addOrderPaymentApi } from '../../redux/reducer/orderReducer';
import axios from 'axios';
import { luuStoreJson } from '../../utils/config';

const Cart = () => {
  const { userInfor } = useSelector((state) => state.authReducer);
  const { lstCart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  const [selectedRows, setSelectedRows] = useState([]);
  const [ipAddress, setIpAddress] = useState(null);
  const [updateInfor, setUpdateInfor] = useState({
    phoneNumber: userInfor?.phoneNumber || "",
    address: userInfor?.address || "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateInfor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const columns = [
    {
      title: 'STT',
      key: 'stt',
      render: (_, rec, idx) => <a>{idx + 1}</a>,
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'hinhAnh',
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
      key: 'giaTien',
      render: (prod) => <p>{(prod.price * 1000).toLocaleString()}</p>,
    },
    {
      title: 'Tổng tiền',
      key: 'total',
      render: (_, rec) => <p>{(rec.product.price * rec.quantity * 1000).toLocaleString()}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Update</a>
          <a>Delete</a>
        </Space>
      ),
    },
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
      key: 'hinhAnh',
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
      key: 'giaTien',
      render: (prod) => <p>{(prod.price * 1000).toLocaleString()}</p>,
    },
    {
      title: 'Tổng tiền',
      key: 'total',
      render: (_, rec) => <p>{(rec.product.price * rec.quantity * 1000).toLocaleString()}</p>,
    }
  ];
  const [open, setOpen] = useState(false)
  const confirmOrder = () => {
    if (selectedRows.length == 0) {
      message.info("Vui lòng chọn sản phẩm để đặt hàng")
    } else {
      setOpen(true)
    }
  };
  const closeModal = () => {
    setOpen(false)
  }
  console.log(selectedRows)
  const order = () => {
    let obj = {
      "idUser": userInfor.idUser,
      "status": 1,
      "phoneNumber": updateInfor.phoneNumber,
      "address": updateInfor.address,
      "thanhToan":"Chưa thanh toán",
      "product": selectedRows.map(row => ({ productId: row.product.idProduct, quantity: row.quantity, idCartDetail: row.idCartDetail, price: row.product.price }))
    }
    console.log(obj)
    setOpen(false)
    dispatch(addOrderApi(obj))
  }
  const paymentOnline = () => {
    let obj = {
      "order": {
        "idUser": userInfor.idUser,
        "status": 1,
        "phoneNumber": updateInfor.phoneNumber,
        "address": updateInfor.address,
        "product": selectedRows.map(row => ({ productId: row.product.idProduct, quantity: row.quantity, idCartDetail: row.idCartDetail, price: row.product.price })),
        "thanhToan":""
      },
      "urlAgain": "http://localhost:3000/cart",
      "ticketNo": ipAddress,
      "price": selectedRows.reduce((total, item) => {
        return total + item.product.price * item.quantity*100000;
      }, 0)
    }
    luuStoreJson("order", obj);
    setOpen(false)
    dispatch(addOrderPaymentApi(obj))
  }
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // setSelectedRows();
    setSelectedRows(selectedRows)
  };

  const rowSelection = {
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (userInfor) {
      dispatch(getAllCartApi(userInfor.idUser));
    }
  }, [dispatch, userInfor]);
  useEffect(() => {
    // Gửi yêu cầu HTTP GET đến https://jsonip.com để lấy địa chỉ IP
    axios.get('https://jsonip.com')
      .then(response => {
        // Lấy địa chỉ IP từ dữ liệu phản hồi
        const ip_address = response.data.ip;
        setIpAddress(ip_address);
      })
      .catch(error => {
        console.error('Đã xảy ra lỗi:', error);
      });
  }, []);
  return (
    <div className="container" style={{ paddingTop: '200px' }}>
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={lstCart}
        rowKey={record => record.idCartDetail}
      />
      <div className="d-flex justify-content-end " style={{ alignItems: 'center' }}>
        <span ><b>Tổng tiền : </b>{selectedRows.reduce((total, item) => {
          return total + item.product.price * item.quantity * 1000;
        }, 0).toLocaleString()}</span>
        <button className='ms-4 newsletter_submit_btn' onClick={confirmOrder}>Đặt hàng</button>
      </div>
      <Modal width={'70%'} title={<p className='text-center'>Xác nhận đơn hàng</p>} open={open} footer={null} onCancel={closeModal} >
        <div className="">
          <h5>Thông tin người nhận</h5>
          <p className="row"><b className='col-3'>Họ tên: </b><span className='col-9'>{userInfor.username}</span></p>
          <p className="row"><b className='col-3'>Số điện thoại: </b>
            <Input
              className='col-9'
              name="phoneNumber"
              placeholder="Số điện thoại"
              value={updateInfor.phoneNumber}
              onChange={handleInputChange}
              style={{ marginBottom: '10px', width: '300px' }}
            /></p>
          <p className="row"><b className='col-3'>Địa chỉ: </b>
            <Input
              className='col-9'
              name="address"
              placeholder="Địa chỉ"
              value={updateInfor.address}
              onChange={handleInputChange}
              style={{ marginBottom: '10px', width: '300px' }}
            /></p>
          <p className="row"><b className='col-3'>Tổng hóa đơn: </b><span className='col-9'>{selectedRows.reduce((total, item) => {
            return total + item.product.price * item.quantity * 1000;
          }, 0).toLocaleString()} </span></p>

        </div>
        <Table
          columns={columns2}
          dataSource={selectedRows}
        />
        <div className='' style={{display:'flex',justifyContent:"end"}}>
          <button className='me-4 newsletter_submit_btn' onClick={paymentOnline}>Thanh toán online</button>
          <button className='newsletter_submit_btn' onClick={order}>Thanh toán khi nhận hàng</button>
        </div>
      </Modal>
    </div>
  );
};

export default Cart;

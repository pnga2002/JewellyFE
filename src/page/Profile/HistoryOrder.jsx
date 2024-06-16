import { Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { getAllOrderByUserIdApi, getOrderDetailApi } from '../../redux/reducer/orderReducer';

const HistoryOrder = () => {
    const { userInfor } = useSelector((state) => state.authReducer);
    const { lstOrder, detailOrder } = useSelector((state) => state.orderReducer);
    const { lstStatus } = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const onClose = () => {
        setOpen(false)
    }
    const setOpenModal = (id) => {
        setOpen(true)
        dispatch(getOrderDetailApi(id))
    }
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
            render: (prod) => <p>{prod.name}</p>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            render: (text, rec) => <p>{text.toLocaleString()}</p>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, rec) => <p style={{ cursor: 'pointer' }} onClick={() => {
                setOpenModal(rec.idOrder)
            }}><i className="fa-regular fa-eye"></i></p>,
        }
    ]
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
            render: (prod) => <p>{prod.price.toLocaleString()}</p>,
        },
        {
            title: 'Tổng tiền',
            key: 'total',
            render: (_, rec) => <p>{(rec.product.price * rec.quantity).toLocaleString()}</p>,
        }
    ];
    useEffect(() => {
        dispatch(getAllOrderByUserIdApi(userInfor?.idUser))
    }, [])
    return (
        <div>
            <Table
                columns={columns}
                dataSource={lstOrder}
                rowKey={record => record.idOrder}
            />
            <Modal width={'70%'} title={<p className='text-center'>Chi tiết đơn hàng</p>} open={open} onClose={onClose} onCancel={onClose} footer={null}>
                <div className="">
                    <h5>Thông tin người nhận</h5>
                    {/* <p className="row"><b className='col-3'>Họ tên: </b><span className='col-9'>{userInfor.username}</span></p>
                    <p className="row"><b className='col-3'>Số điện thoại: </b><span className='col-9'>{userInfor.phoneNumber}</span></p>
                    <p className="row"><b className='col-3'>Email: </b><span className='col-9'>{userInfor.email}</span></p>
                    <p className="row"><b className='col-3'>Địa chỉ: </b><span className='col-9'>{userInfor.address}</span></p> */}
                </div>
                <Table
                    columns={columns2}
                    dataSource={detailOrder}
                />
            </Modal>
        </div>
    )
}

export default HistoryOrder
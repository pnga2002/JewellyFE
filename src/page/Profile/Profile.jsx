import React from 'react'
import HistoryOrder from './HistoryOrder'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux';

const Profile = () => {

    const { userInfor } = useSelector((state) => state.authReducer);
    return (
        <div className='container' style={{ paddingTop: '200px' }} >

            <div className="profile">
                <div className="d-flex align-items-center" >
                    <div className="">
                        <Avatar
                            style={{
                                backgroundColor: '#fe4c50',
                            }}
                            size={300}
                        >
                            {userInfor.username}
                        </Avatar>
                    </div>
                    <div className="" style={{paddingLeft:'50px',width:'100%'}}>
                        <h5 className='py-4'>Thông tin cơ bản</h5>
                        <p className="row"><b className='col-3'>Họ tên: </b><span className='col-9'>{userInfor.username}</span></p>
                        <p className="row"><b className='col-3'>Số điện thoại: </b><span className='col-9'>{userInfor.phoneNumber}</span></p>
                        <p className="row"><b className='col-3'>Email: </b><span className='col-9'>{userInfor.email}</span></p>
                        <p className="row"><b className='col-3'>Địa chỉ: </b><span className='col-9'>{userInfor.address}</span></p>
                    </div>
                </div>
            </div>
            <div className="history_order py-4">
                <h4>Lịch sử đặt hàng</h4>
                <HistoryOrder />
            </div>
        </div>
    )
}

export default Profile
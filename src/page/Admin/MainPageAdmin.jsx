import React, { useEffect } from 'react'
import './statis.css'
import { useDispatch, useSelector } from 'react-redux'
import { getThongKe } from '../../redux/reducer/authReducer'
import { Spin } from 'antd'
const MainPageAdmin = () => {
  let doanhThu = 259900000
  let { thongKe, loading } = useSelector((state) => state.authReducer)
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(getThongKe())
  }, [])
  console.log(thongKe)
  return (
    <div>
      <Spin spinning={loading} >

      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className=''>Thống kê</h4>
        <span></span>
      </div>
      <div className="statistics">
        <div className="stat-column">
          <h2>{(thongKe?.completedOrdersCount/thongKe?.totalOrdersCount)*100}%</h2>
          <p>Đơn hàng đã hoàn thành</p>
        </div>
        <div className="stat-column">
          <h2>{`${thongKe?.pendingOrdersCount}/${thongKe?.totalOrdersCount}`}</h2>
          <p>Đơn hàng chưa hoàn thành</p>
        </div>
        <div className="stat-column">
          <h2>{(thongKe?.totalRevenue*1000).toLocaleString()}</h2>
          <p>Tổng doanh thu</p>
        </div>
      </div>
      </Spin>
    </div>
  );
}

export default MainPageAdmin
import React from 'react'
import './statis.css'
const MainPageAdmin = () => {
  let doanhThu = 259900000
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h4 className=''>Thống kê</h4>
        <span></span>
      </div>
      <div className="statistics">
      <div className="stat-column">
        <h2>95%</h2>
        <p>Đơn hàng đã hoàn thành</p>
      </div>
      <div className="stat-column">
        <h2>8/25</h2>
        <p>Đơn hàng chưa hoàn thành</p>
      </div>
      <div className="stat-column">
        <h2>{doanhThu.toLocaleString()}</h2>
        <p>Tổng doanh thu</p>
      </div>
    </div>
    </div>
  );
}

export default MainPageAdmin
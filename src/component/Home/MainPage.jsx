import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductApi } from '../../redux/reducer/productReducer';
import { history } from '../../App';
const MainPage = () => {
  const { lstProduct } = useSelector((state) => state.productReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductApi())
  }, [])
  return (
    <div>

      <div className="main_slider" style={{ backgroundImage: 'url(https://lili.vn/wp-content/uploads/2023/04/Banner-Top-san-pham-yeu-thich-PC.jpg)' }}>
        <div className="container fill_height">
          <div className="row align-items-center fill_height">
            <div className="col">
              <div className="main_slider_content">
                <h6>Spring / Summer Collection 2017</h6>
                <h1>Get up to 30% Off New Arrivals</h1>
                <div className="red_button shop_now_button"><a href="#">shop now</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="banner_item align-items-center" style={{ backgroundImage: 'url(https://lili.vn/wp-content/uploads/2023/04/Banner-Top-san-pham-yeu-thich-PC.jpg)' }}>
                <div className="banner_category">
                  <a href="categories.html">women's</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="banner_item align-items-center" style={{ backgroundImage: 'url(https://lili.vn/wp-content/uploads/2023/04/Banner-San-pham-moi-nhat-PC.jpg)' }}>
                <div className="banner_category">
                  <a href="categories.html">accessories's</a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="banner_item align-items-center" style={{ backgroundImage: 'url(https://lili.vn/wp-content/uploads/2023/04/Banner-San-pham-moi-nhat-PC.jpg)' }}>
                <div className="banner_category">
                  <a href="categories.html">men's</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="best_sellers">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="section_title new_arrivals_title">
                <h2>Best Sellers</h2>
              </div>
            </div>
          </div>
          <div className="row mt-5">

            {/* Slide 1 */}
            {lstProduct?.map((item, idx) => {
              return <div key={idx} className="col-3 py-2" style={{ height: '100%' }} onClick={() => {
                history.push(`/product/${item.idProduct}`)
              }}>
                <div className="w-full h-full">
                  <div className="product discount" style={{display:'flex',flexDirection:'column'}}>
                    <div className="product_image">
                      <img src={item.imageUrl} alt  style={{borderRadius:'5px'}}/>
                    </div>
                    <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-0%</span></div>
                    <div className="product_info d-flex flex-column align-items-center justify-content-between">
                      <h6 className="product_name"><span>{item.name}</span></h6>
                      <div className="product_price">{(item.price*1000).toLocaleString()} VND</div>
                    </div>
                  </div>
                </div>
              </div>
            })}


          </div>
        </div>
      </div>




    </div>
  )
}

export default MainPage
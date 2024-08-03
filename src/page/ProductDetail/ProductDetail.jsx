import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductDetailApi } from '../../redux/reducer/productReducer';
import { useParams } from 'react-router-dom';
import { addToCartApi } from '../../redux/reducer/cartReducer';
import { message } from 'antd';
import { history } from '../../App';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1)
  const { id } = useParams()
  const { productDetail } = useSelector((state) => state.productReducer)
  const { userInfor } = useSelector((state) => state.authReducer)
  const dispatch = useDispatch();
  const addToCart = () => {
    if(userInfor){
      let obj = {
        "userId": userInfor.idUser,
        "productId": id,
        "quantity": quantity
      }
      dispatch(addToCartApi(obj))
    } else {
      message.info("Bạn cần đăng nhập để tiếp tục mua hàng!")
      history.push('/login')
    }
  }
  useEffect(() => {
    dispatch(getAllProductDetailApi(id))
  }, [id])
  const changeQuantity = () => {
    setQuantity(quantity + 1)
  }
  const giamSL = () => {
    if (quantity == 1) {
      setQuantity(1)
    }
    else {
      setQuantity(quantity - 1)
    }
  }
  return (
    <div>
      <div className="container single_product_container">
        <div className="row">
          <div className="col">
            {/* Breadcrumbs */}
            <div className="breadcrumbs d-flex flex-row align-items-center">
              <ul>
                <li><a>Home</a></li>
                <li><a><i className="fa fa-angle-right" aria-hidden="true" />{productDetail?.category.name}</a></li>
                <li className="active"><a href="#"><i className="fa fa-angle-right" aria-hidden="true" />{productDetail?.name}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-7">
            <div className="single_product_pics">
              <div className="row">
                <div className="col-lg-3 thumbnails_col order-lg-1 order-2">
                  <div className="single_product_thumbnails">
                    <ul>
                      <li><img src={productDetail?.imageUrl} alt data-image={productDetail?.imageUrl} /></li></ul>
                  </div>
                </div>
                <div className="col-lg-9 image_col order-lg-2 order-1">
                  <div className="single_product_image">
                    <div className="single_product_image_background" style={{ backgroundImage: `url(${productDetail?.imageUrl})` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="product_details">
              <div className="product_details_title">
                <h2>{productDetail?.name}</h2>
                <p>{productDetail?.description}</p>
              </div>
              <div className="free_delivery d-flex flex-row align-items-center justify-content-center">
                <span className="ti-truck" /><span>free delivery</span>
              </div>
              <div className="product_price">{productDetail?.price}.000 VND</div>
              <ul className="star_rating">
                <li><i className="fa fa-star" aria-hidden="true" /></li>
                <li><i className="fa fa-star" aria-hidden="true" /></li>
                <li><i className="fa fa-star" aria-hidden="true" /></li>
                <li><i className="fa fa-star" aria-hidden="true" /></li>
                <li><i className="fa fa-star" aria-hidden="true" /></li>
              </ul>
              {/* <div className="product_color">
                                <span>Select Color:</span>
                                <ul>
                                    <li style={{ background: '#e54e5d' }} />
                                    <li style={{ background: '#252525' }} />
                                    <li style={{ background: '#60b3f3' }} />
                                </ul>
                            </div> */}
              <div className="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                <span>Quantity:</span>
                <div className="quantity_selector">
                  <span className="minus" onClick={giamSL}><i className="fa fa-minus" aria-hidden="true" /></span>
                  <span id="quantity_value">{quantity}</span>
                  <span className="plus" onClick={changeQuantity}><i className="fa fa-plus" aria-hidden="true" /></span>
                </div>
                <div className="red_button ">
                  <button className='newsletter_submit_btn' onClick={addToCart}>add to cart</button></div>
                <div className="product_favorite d-flex flex-column align-items-center justify-content-center" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* Benefit */}
        <div className="benefit">
          <div className="container">
            <div className="row benefit_row">
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon"><i className="fa fa-truck" aria-hidden="true" /></div>
                  <div className="benefit_content">
                    <h6>free shipping</h6>
                    <p>Suffered Alteration in Some Form</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon"><i className="fa fa-money" aria-hidden="true" /></div>
                  <div className="benefit_content">
                    <h6>cach on delivery</h6>
                    <p>The Internet Tend To Repeat</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon"><i className="fa fa-undo" aria-hidden="true" /></div>
                  <div className="benefit_content">
                    <h6>45 days return</h6>
                    <p>Making it Look Like Readable</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 benefit_col">
                <div className="benefit_item d-flex flex-row align-items-center">
                  <div className="benefit_icon"><i className="fa fa-clock-o" aria-hidden="true" /></div>
                  <div className="benefit_content">
                    <h6>opening all week</h6>
                    <p>8AM - 09PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Newsletter */}
        <div className="newsletter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="newsletter_text d-flex flex-column justify-content-center align-items-lg-start align-items-md-center text-center">
                  <h4>Newsletter</h4>
                  <p>Subscribe to our newsletter and get 20% off your first purchase</p>
                </div>
              </div>
              <div className="col-lg-6">
                <form action="post">
                  <div className="newsletter_form d-flex flex-md-row flex-column flex-xs-column align-items-center justify-content-lg-end justify-content-center">
                    <input id="newsletter_email" type="email" placeholder="Your email" required="required" data-error="Valid email is required." />
                    <button id="newsletter_submit" type="submit" className="newsletter_submit_btn trans_300" value="Submit">subscribe</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default ProductDetail
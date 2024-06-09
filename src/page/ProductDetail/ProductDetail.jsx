import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductDetailApi } from '../../redux/reducer/productReducer';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
    const [quantity,setQuantity] = useState(1)
    const { id } = useParams()
    const { productDetail } = useSelector((state) => state.productReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProductDetailApi(id))
    }, id)
    const changeQuantity = () => { 
    setQuantity(quantity+1)
     }
    const giamSL = () => { 
    if(quantity==1){
        setQuantity(1)
    }
    else{
        setQuantity(quantity-1)
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
                                <li><a><i className="fa fa-angle-right" aria-hidden="true" />{productDetail.category.name}</a></li>
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
                                            <li><img src={productDetail?.imageUrl} alt data-image={productDetail?.imageUrl}/></li></ul>
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
                                <h2>Pocket cotton sweatshirt</h2>
                                <p>Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis ut...</p>
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
                                <div className="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                                <div className="product_favorite d-flex flex-column align-items-center justify-content-center" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetail
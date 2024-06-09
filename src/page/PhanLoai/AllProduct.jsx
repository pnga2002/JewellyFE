import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductApi } from '../../redux/reducer/productReducer';
import { NavLink } from 'react-router-dom';
import { history } from '../../App';

const AllProduct = () => {
    const { lstProduct } = useSelector((state) => state.productReducer)
    const { lstCate } = useSelector((state) => state.categoryReducer)
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getAllProductApi())
    },[])
    return (
        <div>
            <div className="container product_section_container">
                <div className="row">
                    <div className="col product_section clearfix">
                        {/* Breadcrumbs */}
                        <div className="breadcrumbs d-flex flex-row align-items-center">
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li className="active"><a><i className="fa fa-angle-right" aria-hidden="true" />Category</a></li>
                            </ul>
                        </div>
                        {/* Sidebar */}
                        <div className="sidebar">
                            <div className="sidebar_section">
                                <div className="sidebar_title">
                                    <h5>Product Category</h5>
                                </div>
                                <ul className="sidebar_categories">
                                   {lstCate?.map((item,idx)=>{
                                    return <li><a href="#">{item.name}</a></li>
                                   })}
                                </ul>
                            </div>
                            
                        </div>
                        {/* Main Content */}
                        <div className="main_content">
                            {/* Products */}
                            <div className="products_iso">
                            <div className="row mt-5">
          
          {/* Slide 1 */}
         {lstProduct?.map((item,idx)=>{
          return  <div key={idx} className="col-3" onClick={() => { 
            history.push(`/product/${item.idProduct}`)
           }}>
          <div className="w-full h-full">
            <div className="product discount">
              <div className="product_image">
                <img src={item.imageUrl} alt />
              </div>
              <div className="favorite favorite_left" />
              <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
              <div className="product_info">
                <h6 className="product_name"><span>{item.name}</span></h6>
                <div className="product_price">{item.price}</div>
              </div>
            </div>
          </div>
        </div>
         })}
         
        
  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AllProduct
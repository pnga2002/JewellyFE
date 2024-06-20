import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductApi, getAllProductCategoryApi } from '../../redux/reducer/productReducer';
import { NavLink, useSearchParams } from 'react-router-dom';
import { history } from '../../App';
import { toAliasString } from '../../utils/convertAlias';
import './phanloai.css'
const AllProduct = () => {
    const { lstProduct } = useSelector((state) => state.productReducer)
    const { lstCate } = useSelector((state) => state.categoryReducer)
    const [idCate,setIdCate] = useState(0)
    let [searchParams, setSearchParams] = useSearchParams({
      cate: "",
      // key:""
  });
  const fetchIdcate = (text) => { 
    const category = lstCate?.find(category => toAliasString(category.name) ==text);
    setIdCate(category ? category.idCategory : 0)
   }
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(getAllProductCategoryApi(idCate))
    },[idCate])
    useEffect(()=>{
      fetchIdcate(searchParams.get("cate"))
    },[searchParams.get("cate"),lstCate])
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
                                <li><p className={`${idCate==0 && 'active'}`} onClick={() => { 
                                      searchParams.set("cate","all");
                                      setSearchParams(searchParams);
                                      setIdCate(0)
                                     }}>All</p></li>
                                   {lstCate?.map((item,idx)=>{
                                    return <li><p className={`${idCate==item.idCategory && 'active'}`} onClick={() => { 
                                      searchParams.set("cate",toAliasString(item.name));
                                      setSearchParams(searchParams);
                                      setIdCate(item.idCategory)
                                     }}>{item.name}</p></li>
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
          return  <div key={idx} className="col-3 py-2" style={{ height: '100%' }} onClick={() => {
            history.push(`/product/${item.idProduct}`)
          }}>
            <div className="w-full h-full">
              <div className="product discount" style={{display:'flex',flexDirection:'column'}}>
                <div className="product_image">
                  <img src={item.imageUrl} alt style={{borderRadius:'5px'}}/>
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
                </div>
            </div>

        </div>
    )
}

export default AllProduct
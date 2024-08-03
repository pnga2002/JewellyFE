import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { getAllCateApi } from '../redux/reducer/categoryReducer';
import './style.css'
import { history } from '../App';
import { removeStore } from '../utils/config';
import { getAllCartApi } from '../redux/reducer/cartReducer';
import { message } from 'antd';
import { toAliasString } from '../utils/convertAlias';
import { Input, Space } from 'antd';
import { getProductSearch } from '../redux/reducer/productReducer';
const { Search } = Input;

const HomeTemplate = () => {
    const { lstCate } = useSelector((state) => state.categoryReducer)
    const { userInfor } = useSelector((state) => state.authReducer)
    const { lstCart } = useSelector((state) => state.cartReducer)
    const dispatch = useDispatch();

    const location = useLocation();
    let [searchParams, setSearchParams] = useSearchParams({
        cate: ""
    });
    const onSearch=(e) => { 
        if (location.pathname !== '/phan-loai') {
            // Navigate to 'phan-loai' page
            history.push('/phan-loai');
        }
        dispatch(getProductSearch(e))
     }
    useEffect(() => {
        // if (!userInfor) {
        //     history.push('/login')
        //     message.info("Vui lòng đăng nhập hoặc tạo tài khoản để trải nghiệm trang web")
        // }
        // else {
            // dispatch(getAllCateApi())
            // dispatch(getAllCartApi(userInfor?.idUser))
        // }
        if(userInfor){
            dispatch(getAllCartApi(userInfor?.idUser))
        }
        dispatch(getAllCateApi())
    }, [])
    return (
        <div className="super_container">
            <header className="header trans_300">
                <div className="top_nav">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="top_nav_left">free shipping on all u.s orders over $50</div>
                            </div>
                            <div className="col-md-6 text-right">
                                <div className="top_nav_right">
                                    <ul className="top_nav_menu">
                                        {/* <li className="currency">
                                            <a href="#">
                                                usd
                                                <i className="fa fa-angle-down" />
                                            </a>
                                            <ul className="currency_selection">
                                                <li><a href="#">cad</a></li>
                                                <li><a href="#">aud</a></li>
                                                <li><a href="#">eur</a></li>
                                                <li><a href="#">gbp</a></li>
                                            </ul>
                                        </li>
                                        <li className="language">
                                            <a href="#">
                                                English
                                                <i className="fa fa-angle-down" />
                                            </a>
                                            <ul className="language_selection">
                                                <li><a href="#">French</a></li>
                                                <li><a href="#">Italian</a></li>
                                                <li><a href="#">German</a></li>
                                                <li><a href="#">Spanish</a></li>
                                            </ul>
                                        </li> */}
                                        <li className="account" >
                                            {userInfor ?
                                                <a href='' className='' onClick={() => {
                                                    removeStore('user_infor')
                                                    history.push('/login')
                                                }}>
                                                    Hello {userInfor?.username}
                                                    <i className="ms-3 fa-solid fa-right-from-bracket" ></i>
                                                </a>

                                                :
                                                <>
                                                    <a href="#">
                                                        My Account
                                                        <i className="fa fa-angle-down" />
                                                    </a>
                                                    <ul className="account_selection ps-0">
                                                        <li style={{ cursor: 'pointer' }} onClick={() => {
                                                            history.push('/login')
                                                        }}><i className="fa fa-sign-in pr-2" aria-hidden="true" /><span href="#">Sign In</span></li>
                                                        <li><i className="fa fa-user-plus pr-2" aria-hidden="true" /><span href="#">Register</span></li>
                                                    </ul>
                                                </>}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main Navigation */}
                <div className="main_nav_container">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-right">
                                <div className="logo_container" onClick={() => {
                                    history.push("/")
                                }}>
                                    <a href="#">c29<span>shop</span></a>
                                </div>
                                <nav className="navbar">
                                    <ul className="navbar_menu">
                                        <li><NavLink to="/">home</NavLink></li>
                                        <li className="nav-item dropdown">
                                            <span className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => {
                                                history.push('/phan-loai')
                                            }}>
                                                Category
                                            </span>
                                            <ul className="dropdown-menu">
                                                {lstCate?.map((item, idx) => {
                                                    return <li onClick={() => {
                                                        history.push(`/phan-loai?cate=${toAliasString(item.name)}`)
                                                    }}><a className="dropdown-item" href="#">{item.name}</a></li>
                                                })}
                                            </ul>
                                        </li>

                                        <li><a href="#">promotion</a></li>
                                        <li><a href="#">pages</a></li>
                                        <li><a href="#">blog</a></li>
                                        <li><a href="contact.html">contact</a></li>
                                    </ul>
                                    <ul className="navbar_user">
                                        <li><Search
                                            placeholder="Tìm kiếm sản phẩm"
                                            onSearch={onSearch}
                                            style={{
                                                width: 200,
                                            }}
                                        /></li>
                                        <li onClick={() => {
                                            history.push('/profile')
                                        }}><a href="#"><i className="fa fa-user" aria-hidden="true" /></a></li>
                                        <li className="checkout" onClick={() => {
                                            history.push('/cart')
                                        }}>
                                            <a href="#">
                                                <i className="fa fa-shopping-cart" aria-hidden="true" />
                                                <span id="checkout_items" className="checkout_items">{lstCart?.length}</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="hamburger_container">
                                        <i className="fa fa-bars" aria-hidden="true" />
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="" style={{ minHeight: '100vh', width: '100%', margin: '0 auto' }}>
                <Outlet />
            </div>
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
                                <ul className="footer_nav">
                                    <li><a href="#">Blog</a></li>
                                    <li><a href="#">FAQs</a></li>
                                    <li><a href="contact.html">Contact us</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
                                <ul>
                                    <li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-twitter" aria-hidden="true" /></a></li>
                                    <li><a href="#"><i className="fa-brands fa-instagram" aria-hidden="true" /></a></li>
                                    <li><a href="#"><i className="fa-brands fa-skype" aria-hidden="true" /></a></li>
                                    <li><a href="#"><i className="fa-brands fa-pinterest" aria-hidden="true" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="footer_nav_container">
                                <div className="cr">©2018 All Rights Reserverd. Made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="#">Colorlib</a> &amp; distributed by <a href="https://themewagon.com">ThemeWagon</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    )
}

export default HomeTemplate
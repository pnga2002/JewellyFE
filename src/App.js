import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from "history";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
  Navigate,
} from "react-router-dom";
import HomeTemplate from './template/HomeTemplate';
import './assets/categories_responsive.css'
import './assets/categories_styles.css'
import './assets/contact_responsive.css'
import './assets/contact_styles.css'
import './assets/main_styles.css'
import './assets/responsive.css'
import './assets/single_responsive.css'
import './assets/single_styles.css'
import './assets/bootstrap4/bootstrap.min.css'
import MainPage from './component/Home/MainPage';
import AllProduct from './page/PhanLoai/AllProduct';
import ProductDetail from './page/ProductDetail/ProductDetail';
import Login from './page/Login/Login';
import Cart from './page/Cart/Cart';
export const history = createBrowserHistory();
function App() { 
  return (
    <HistoryRouter history={history}>
      <Routes>
        {/* <Route index element={<Home />} /> */}
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<MainPage />} />
         
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/phan-loai" element={<AllProduct />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/*" element={<PagenotFound />} /> */}
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </HistoryRouter> 
  );
}

export default App;

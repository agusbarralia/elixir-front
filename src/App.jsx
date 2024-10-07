import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from "./page/Home";
import ProductPage from "./page/ProductDetail";
import ProductsCategory from "./page/ProductsCategory";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from 'react-router-dom';
import Cart from './page/Cart';
import Login from './page/Login';
import Register from './page/Register';
import Checkout from './page/Checkout';
import OrderHistory from './page/OrderHistory';
import OrderDetail from './page/OrderDetail';
import AdminProductsPage from './page/AdminProductsPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <div className="flex-grow">
          <Navbar />
            <Routes>
              
              <Route path="/" element={<Home />} />
              <Route path="admin/products" element={<AdminProductsPage/>} />
              <Route path="/product/:productName" element={<ProductPage />} />
              <Route path="/products/:category" element={<ProductsCategory />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<OrderHistory />} />
              <Route path="/order/:id" element={<OrderDetail />} />

            </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;


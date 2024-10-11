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
import AdminProduct from './page/AdminProduct';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './page/AdminDashboard';
import Sidebar from './components/Sidebar';
import AdminProductForm from './page/AdminProductForm';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminEditProduct from './page/AdminEditProduct';
import AdminCategories from './page/AdminCategories';
import ThankPage from './page/ThankPage';


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation(); // Obtener la ubicación actual

  // Determinar si estamos en una ruta de administración
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        <div className={`flex-grow ${isAdminRoute ? 'flex' : 'flex-grow'}`}>
          {isAdminRoute ? (
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-grow">
                <Routes>
                  <Route
                    path="/admin"
                    element={
                      <ProtectedAdminRoute>
                        <AdminDashboard />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <ProtectedAdminRoute>
                        <AdminProduct />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products/create"
                    element={
                      <ProtectedAdminRoute>
                        <AdminProductForm />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/products/edit/:productId"
                    element={
                      <ProtectedAdminRoute>
                        <AdminEditProduct />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/category"
                    element={
                      <ProtectedAdminRoute>
                        <AdminCategories />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders"
                    element={
                      <ProtectedAdminRoute>
                        <OrderHistory />
                      </ProtectedAdminRoute>
                    }
                  />
                  <Route
                    path="/admin/orders/:id"
                    element={
                      <ProtectedAdminRoute>
                        <OrderDetail />
                      </ProtectedAdminRoute>
                    }
                  />
                  {/* Otras rutas de administración */}
                </Routes>
              </div>
            </div>
          ) : (
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:productName" element={<ProductPage />} />
                <Route path="/products/:category" element={<ProductsCategory />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/cart" 
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/orders" 
                  element={
                    <ProtectedRoute>
                      <OrderHistory />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/orders/:id" 
                  element={
                    <ProtectedRoute>
                      <OrderDetail />
                    </ProtectedRoute>
                  }
                />
                <Route 
                  path="/thankspage" 
                  element={
                  <ProtectedRoute>
                    <ThankPage />
                  </ProtectedRoute>
                  }
                />
              </Routes>
            </>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;

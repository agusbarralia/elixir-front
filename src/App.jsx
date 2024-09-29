import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Home from "./page/Home";
import ProductPage from "./page/ProductDetail";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Footer from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Restablece el scroll a la parte superior
  }, [pathname]);  // El efecto se activa cada vez que el pathname cambia

  return null;
}


function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Router>
        <ScrollToTop /> {/* Esto restablecerá el scroll cuando cambie la ruta */}
          <div className="flex-grow">
              <Navbar />
                <Routes>
                  {/* Ruta para la Home Page */}
                  <Route path="/" element={<Home />} />
                  {/* Ruta para la página de detalles del producto */}
                  <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
              <Footer/>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;

import Home from "./page/Home";
import ProductPage from "./page/ProductDetail";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Routes, Route, ScrollRestoration  } from 'react-router-dom';
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Router>
          <div className="flex-grow">
            <main>
              <Navbar />
                <Routes>
                  {/* Ruta para la Home Page */}
                  <Route path="/" element={<Home />} />
                  {/* Ruta para la página de detalles del producto */}
                  <Route path="/product/:id" element={<ProductPage />} />
                </Routes>
              <Footer/>
            </main>
          </div>

        </Router>
      </div>
    </>
  );
}

export default App;

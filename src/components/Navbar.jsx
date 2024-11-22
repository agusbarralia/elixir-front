import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice"
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener datos de autenticación desde Redux
  const { isAuthenticated, role, token } = useSelector((state) => state.users);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/${category.toLowerCase()}`);
  };

  const fetchCartItems = async () => {
    if (!token) return; // Evita la solicitud si no hay token
    try {
      const response = await fetch("http://localhost:8080/cart", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo recuperar el carrito");
      }

      const data = await response.json();
      const formattedItems = data.productsCart.map((item) => ({
        id: item.product_id,
        name: item.name,
        quantity: item.quantity,
        price: item.unit_price,
        subtotal: item.subtotal,
      }));

      setCartItems(formattedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("No se pudo recuperar las categorías");
      }

      const data = await response.json();
      setCategories(data); // Asumimos que data es un array de categorías
      setLoading(false); // Marcar como cargado
    } catch (error) {
      console.error(error);
      setLoading(false); // Marcar como cargado incluso si hubo un error
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchCategories();
  }, [token]);

  const handleLogout = () => {
    dispatch(logoutUser()); // Disparar acción de cerrar sesión
    navigate("/login");
  };

  const handleUserPageClick = () => {
    navigate("/UserPage");
  };

  const handleOrders = () => {
    navigate("/orders");
  };

  const handleAdmin = () => {
    navigate('/admin/products')
  } 

  // Condición para renderizar mientras se cargan las categorías
  if (loading) {
    return <div className="loader">Cargando...</div>;
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-950 text-white relative">
      <div className="text-xl font-bold">
        <Link to={'/'}>Elixir</Link>
      </div>

      <div className="flex space-x-4 relative">
        {categories.map((category, index) => (
          <div key={index} className="relative">
            <button onClick={() => handleCategoryClick(category.name)} className="hover:text-gray-400">
              {category.name}
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2 relative">
        <SearchBar />

        {role === "USER" && <button onClick={handleOrders}>Pedidos</button>}

        {role !== "ADMIN" ? (
          <div className="flex flex-row items-center space-x-2">
            <button className="text-lg" onClick={handleCartClick}>
              🛒
            </button>
            {isAuthenticated && <button onClick={handleUserPageClick}>Mis Datos</button>}
          </div>
        ) : (
          <a href="#" onClick={handleAdmin} className="hover:text-gray-400">
            Administración
          </a>
        )}

        {isAuthenticated ? (
          <button onClick={handleLogout} className="hover:text-gray-400">
            Cerrar Sesión
          </button>
        ) : (
          <a href="/login" className="hover:text-gray-400">
            Iniciar Sesión
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

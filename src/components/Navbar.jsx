import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { fetchCategories } from "../redux/tagsSlice";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtener datos de autenticación desde Redux
  const { isAuthenticated, role } = useSelector((state) => state.users);
  const { categoriesItems: categories, loading } = useSelector((state) => state.tags);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/${category.toLowerCase()}`);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleUserPageClick = () => {
    navigate("/UserPage");
  };

  const handleOrders = () => {
    navigate("/orders");
  };

  const handleAdmin = () => {
    navigate("/admin/products");
  };

  // Condición para renderizar mientras se cargan las categorías
  if (loading) {
    return <div className="loader">Cargando...</div>;
  }

  return (
    <nav className="relative flex items-center p-4 bg-rose-950 bg-opacity-100 text-white">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="/ElixirLogoWhite.png"
            alt="Elixir Logo"
            className="h-10 w-auto"
          />
        </Link>
      </div>

      {/* Categorías centradas */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 text-lg font-semibold tracking-wide">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className="hover:text-gray-300 uppercase"
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Opciones a la derecha */}
      <div className="ml-auto flex items-center space-x-4">
        <SearchBar />

        {role === "USER" && (
          <button onClick={handleOrders} className="hover:text-gray-300">
            Pedidos
          </button>
        )}

        {role !== "ADMIN" ? (
          <div className="flex items-center space-x-4">
            <button onClick={handleCartClick} className="text-lg">
              🛒
            </button>
            {isAuthenticated && (
              <button onClick={handleUserPageClick} className="hover:text-gray-300">
                Mis Datos
              </button>
            )}
          </div>
        ) : (
          <a
            href="#"
            onClick={handleAdmin}
            className="hover:text-gray-300"
          >
            Administración
          </a>
        )}

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="text-white font-bold hover:text-red-600"
          >
            Cerrar Sesión
          </button>
        ) : (
          <a href="/login" className="font-bold hover:text-gray-300">
            Iniciar Sesión
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

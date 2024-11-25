import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/userSlice";

const UserPage = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const { token, user, loading, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [token, dispatch]);

  const handleEditProfileClick = () => setShowForm(true);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  if (loading) return <p>Cargando perfil...</p>;

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No se encontraron los datos del usuario.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      {!showForm ? ( // Mostrar datos del usuario si no se está editando
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Perfil de Usuario</h1>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-700">Nombre de Usuario:</p>
              <p className="text-lg text-gray-900">{user.username}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-700">Nombre:</p>
              <p className="text-lg text-gray-900">{user.name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-700">Apellido:</p>
              <p className="text-lg text-gray-900">{user.last_name}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold text-gray-700">Email:</p>
              <p className="text-lg text-gray-900">{user.email}</p>
            </div>
          </div>
          <div className="mt-6 text-right">
            <button
              onClick={handleEditProfileClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Editar perfil
            </button>
          </div>
        </>
      ) : ( 
        <UserForm 
          userData={user} 
          onClose={handleCloseForm} // Pasar la función para cerrar el formulario
        />
      )}
    </div>
  );
};

export default UserPage;

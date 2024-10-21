import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

const UserPage = () => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const url = "http://localhost:8080/users/user";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/login");
    }
  }, []);

  const fetchUserData = () => {
    if (token) {
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al realizar la solicitud");
          }
          return response.json();
        })
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error:", error));
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const handleButtonClick = () => setShowForm(true);
  const handleCloseForm = () => {
    setShowForm(false);
    fetchUserData();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Perfil de Usuario</h1>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-700">Nombre de Usuario:</p>
          <p className="text-lg text-gray-900">{userData.username}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-700">Nombre:</p>
          <p className="text-lg text-gray-900">{userData.name}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-700">Apellido:</p>
          <p className="text-lg text-gray-900">{userData.last_name}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-700">Email:</p>
          <p className="text-lg text-gray-900">{userData.email}</p>
        </div>
      </div>
      <div className="mt-6 text-right">
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Editar perfil
        </button>
      </div>
      {showForm && (
        <UserForm
          onClose={handleCloseForm} // Actualiza datos al cerrar el formulario
          userData={userData}
          onSave={handleCloseForm} // Trigger para obtener datos actualizados
        />
      )}
    </div>
  );
};

export default UserPage;

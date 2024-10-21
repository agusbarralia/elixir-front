import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

const UserPage = () => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState(null); // Manejar el token en el estado
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const url = "http://localhost:8080/users/user";

  // Obtener el token cuando se monta el componente
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate("/login"); // Redirige al login si no hay token
    }
  }, []);

  // Obtener los datos del usuario si hay un token
  const fetchUserData = () => {
    if (token) {
      fetch(url, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
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

  // Llamar a fetchUserData cuando se monta el componente o cuando el token cambie
  useEffect(() => {
    fetchUserData();
  }, [token]);

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchUserData(); // Vuelve a obtener los datos después de cerrar el formulario
  };

  return (
    <div>
      <h1>Datos del Usuario</h1>
      <div>
        <p><strong>Nombre de Usuario:</strong> {userData.username}</p>
        <p><strong>Nombre:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Apellido:</strong> {userData.last_name}</p>
      </div>
      <button onClick={handleButtonClick}>Editar perfil</button>
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

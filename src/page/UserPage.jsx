import React, { useState, useEffect } from "react";

const UserPage = () => {
  const [userData, setUserData] = useState({});

  const url = "http://localhost:8080/user/data";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la solicitud");
        }
        return response.json();
      })
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Datos del Usuario</h1>
      <div>
        <p><strong>Nombre de Usuario:</strong> {userData.username}</p>
        <p><strong>Nombre:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Apellido:</strong> {userData.last_name}</p>
      </div>
    </div>
  );
};

export default UserPage;
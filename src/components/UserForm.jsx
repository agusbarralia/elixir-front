import React, { useState, useEffect } from "react";

const UserForm = ({userData }) => {
  const [formData, setFormData] = useState({
    username: userData.username || "",
    name: userData.name || "",
    email: userData.email || "",
    last_name: userData.last_name || ""
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const token = localStorage.getItem('token');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "El nombre de usuario es requerido";
    if (!formData.name) newErrors.name = "El nombre es requerido";
    if (!formData.last_name) newErrors.last_name = "El apellido es requerido";
    if (!validateEmail(formData.email)) newErrors.email = "El correo electrónico no es válido";

    setErrors(newErrors);

    // El formulario es válido si no hay errores
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    // Validar el formulario al montar el componente
    validateForm();
  }, []);

  useEffect(() => {
    // Validar el formulario cada vez que cambie el estado de los campos
    validateForm();
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('last_name', formData.last_name);

        console.log('Token:', token);

        // Llamada a la API (ajusta la URL a tu backend)
        const response = await fetch(`http://localhost:8080/users/user`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataToSend,
        });
      
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
    
        const data = await response.json();
        console.log('Usuario actualizado:', data);
      } catch (error) {
          console.error('Error al actualizar el usuario:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Formulario de Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellido:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Guardar
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded-md shadow-sm"
          >
            Cerrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

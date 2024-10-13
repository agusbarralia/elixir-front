import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Función para obtener todos los usuarios
    const fetchUsers = async () => {
        try {
            const response = await fetch('/users/admin/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error fetching users');
            }
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new TypeError("La respuesta no es JSON");
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
            // Manejo de errores (ej. redirigir al login si no está autenticado)
            if (error.message === 'Error fetching users') {
                navigate('/login'); // Redirigir al login si hay un error
            }
        }
    };
    // Función para activar/desactivar un usuario
    const toggleUserState = async (user) => {
        try {
            const response = await fetch(`/users/admin/users`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: user.username, state: !user.state }),
            });
            if (!response.ok) {
                throw new Error('Error updating user state');
            }
            fetchUsers();
        } catch (error) {
            console.error(error);
            // Manejo de errores
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Gestión de Usuarios</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nombre de Usuario</th>
                        <th>Email</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.username}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.state ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                <button onClick={() => toggleUserState(user)}>
                                    {user.state ? 'Desactivar' : 'Activar'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ul>
                {users.map(user => (
                    <li key={user.username}>
                        {user.name} {user.last_name} - {user.state ? 'Activo' : 'Inactivo'}
                        <button onClick={() => toggleUserState(user)}>
                            {user.state ? 'Desactivar' : 'Activar'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUserManagement;
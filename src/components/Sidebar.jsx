import React from 'react'

function Sidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>
          <ul>
            <li className="mb-4">
              <a href="/admin" className="hover:text-gray-300">Dashboard</a>
            </li>
            <li className="mb-4">
              <a href="/admin/products" className="hover:text-gray-300">Products</a>
            </li>
            <li className="mb-4">
              <a href="/admin/orders" className="hover:text-gray-300">Orders</a>
            </li>
            <li className="mb-4">
              <a href="/admin/users" className="hover:text-gray-300">Users</a>
            </li>
            <li className="mb-4">
              <a href="/admin/category" className="hover:text-gray-300">Categories</a>
            </li>
            <li className="mb-4">
              <a href="/" className="hover:text-gray-300">Home</a>
            </li>
          </ul>
        </div>
      </div>  
)
}

export default Sidebar
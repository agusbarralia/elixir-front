/* eslint-disable react/prop-types */
// src/components/CartDropdown.jsx
import React from 'react';

const CartDropdown = ({ cartItems, subtotal, handleCartClick, handleCheckoutClick, isCartHovered, handleCartMouseEnter, handleCartMouseLeave }) => {
    return (
        <div 
        className="relative" 
        onMouseEnter={handleCartMouseEnter} 
        onMouseLeave={handleCartMouseLeave}
        >
        <button className="text-lg " onClick={handleCartClick}>
            🛒
            {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">
                {cartItems.length}
            </span>
            )}
        </button>
        
        {isCartHovered && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white text-black rounded-lg shadow-lg p-4 z-10">
            <h3 className="font-bold mb-2">Carrito / ${subtotal.toLocaleString()}</h3>
            <ul className="max-h-40 overflow-y-auto mb-2">
                {cartItems.map(item => (
                <li key={item.id}>{item.name} - ${item.price}</li>
                ))}
            </ul>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-2" 
                onClick={handleCartClick}
            >
                Ver carrito
            </button>
            <button 
                className="bg-green-500 text-white px-4 py-2 rounded-md w-full" 
                onClick={handleCheckoutClick}
            >
                Finalizar compra
            </button>
            </div>
        )}
        </div>
    );
};

export default CartDropdown;
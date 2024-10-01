//import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">Elixir</h3>
          <p>Explora los mejores vinos y bebidas.</p>
        </div>
        <div className="space-y-2">
          <a href="#" className="hover:text-gray-400">Política de privacidad</a>
          <a href="#" className="hover:text-gray-400">Términos y condiciones</a>
          <a href="#" className="hover:text-gray-400">Contacto</a>
        </div>
        <div>
          <h3 className="font-bold">Suscríbete</h3>
          <input
            type="email"
            placeholder="Tu correo"
            className="p-2 rounded bg-gray-800"
          />
          <button className="ml-2 px-4 py-2 bg-red-600 rounded">Enviar</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

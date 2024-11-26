const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white p-6">
      <div className="flex justify-between items-center">
        {/* Sección izquierda */}
        <div>
          <h3 className="font-bold text-lg">Elixir</h3>
          <p>Explora los mejores vinos y bebidas.</p>
        </div>

        {/* Sección derecha */}
        <div>
          <p className="text-sm">2024 - Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

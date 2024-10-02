import ProductDescription from "../components/ProductDescription";
import ProductAddToCart from "../components/ProductAddToCart";
import ProductData from "../components/ProductData";
import ImageCarousel from "../components/ImageCarousel"; // Importa el nuevo componente

const ProductDetail = () => {
  //const { id } = useParams();  // Obtiene el ID del producto desde la URL

  // Lista de imágenes para el carrusel
  const images = [
    "/beer.jpg",
    "/beer2.jpg",
    "/banner_main.png",
    "/beer.jpg",
    "/beer2.jpg",
    "/banner_main.png",
    "/beer.jpg",
    "/beer2.jpg",
    "/banner_main.png",
    "/beer.jpg",
    "/beer2.jpg",
    "/banner_main.png",
    "/trumpeter 1.png"
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg ">
        <div className="flex justify-center bg-gray-50 pt-20">
          {/* Usamos el ImageCarousel aquí */}
          <ImageCarousel images={images} />
        </div>
        <div className="flex flex-col justify-between">
          <ProductDescription 
            title={"Shannon"} 
            brand={"Mount Bullet 2016"} 
            description={"Un vino tinto elegante, originario de la región vinícola de Irlanda, conocido por su rica mezcla de uvas que crean un perfil de sabor distintivo. Su aroma se caracteriza por notas de frutos oscuros, como moras y ciruelas, combinadas con sutiles matices de especias y roble. En boca, presenta una estructura suave y equilibrada, con taninos bien integrados que hacen de cada sorbo una experiencia deliciosa y memorable."}
          />
          <ProductAddToCart price={"$65"} />
          <ProductData type={"Vino"} color={"Blanco"} variety={"Malbec"} size={"750ml"} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

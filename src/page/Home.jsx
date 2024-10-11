import Banner from "../components/Banner";
import CategoriesShelf from "../components/CategoriesShelf";
import ProductList from "../components/ProductList";
import { useState,useEffect } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);

  const url = "http://localhost:8080/products";

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al realizar la solicitud");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>

      <Banner />
      <div id="content" className="p-4">
        <CategoriesShelf />
        <ProductList title={"Productos Recomendados"} products={products}/>
        
      </div>
    </div>
  );
};

export default Home;

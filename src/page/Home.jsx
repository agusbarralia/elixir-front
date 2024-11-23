import Banner from "../components/Banner";
import CategoriesShelf from "../components/CategoriesShelf";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div>
      <Banner />
      <div id="content" className="p-4">
      <CategoriesShelf />
      <ProductList title={"Productos Recomendados"}/>  
      </div>
    </div>
  );
};

export default Home;

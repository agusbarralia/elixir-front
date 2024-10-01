//import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  //const { id } = useParams();  // Obtiene el ID del producto desde la URL

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg ">
        <div className="flex justify-center bg-gray-50 pt-20">
          <img
            src="/trumpeter 1.png"
            alt="Shannon Mount Bullet 2015"
            className="w-full max-w-sm h-auto object-cover"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold pt-20">Shannon</h2>
            <h3 className="text-xl text-gray-600 mb-4">MOUNT BULLET 2015</h3>
            <p className="text-gray-700 mb-4 pt-5">
              This organic and biodynamically produced sparkling taste is as delicious as it is unique. Welcoming from the high mountains of Savoy, the Mont Blanc Bellevard cell is extremely fresh and mineral, ideal as an aperitif or in combination with seafood.
            </p>
          </div>

          <div className="mt-4">
            <div className="flex items-baseline mb-6">
              <span className="text-3xl mr-8 ">$65</span>
              <span className="text-gray-600 mr-10" >750 ml</span>
              <button className="px-4 py-2 bg-gray-200 text-black rounded-l">-</button>
              <span className="px-6 py-2 bg-white border border-gray-200">1</span>
              <button className="px-4 py-2 bg-gray-200 text-black rounded-r">+</button>
            </div>

            <button className="w-80 px-4 py-3 bg-black text-white font-bold hover:bg-gray-800">
              Add to cart
            </button>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Type</h4>
                <p className="text-gray-600 ">Wine</p>
              </div>
              <div>
                <h4 className="font-semibold">Color</h4>
                <p className="text-gray-600">White</p>
              </div>
              <div>
                <h4 className="font-semibold">Sweetness</h4>
                <p className="text-gray-600">Dry</p>
              </div>
              <div>
                <h4 className="font-semibold">Country</h4>
                <p className="text-gray-600">France</p>
              </div>
              <div>
                <h4 className="font-semibold">Sort</h4>
                <p className="text-gray-600">Mount Bullet</p>
              </div>
              <div>
                <h4 className="font-semibold">Region</h4>
                <p className="text-gray-600">Savoy</p>
              </div>
              <div>
                <h4 className="font-semibold">Taste</h4>
                <p className="text-gray-600">Easy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

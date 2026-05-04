import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductCard from "./ProductCard";
import CategoryBar from "./CategoryBar";


function CategoryPage({ products, addToCart, toggleWishlist, wishlist, cartCount,setSelectedCategory ,search}) {

  const { categoryName } = useParams();

 const filteredProducts = products.filter(product =>
  product.category.toLowerCase() === categoryName.toLowerCase() &&
  product.name.toLowerCase().includes(search.toLowerCase())
);
  return (

    <div>

      <Navbar cartCount={cartCount} setSearch={() => {}} />
        <CategoryBar setSelectedCategory={setSelectedCategory} />

      <div className="container mt-4">

        <h2 style={{ textTransform: "capitalize" }}>
          {categoryName}
        </h2>

        <div className="row">

          {filteredProducts.map((product, index) => (

            <ProductCard
              key={index}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating}
              image={`/images/${product.image}`}
              addToCart={addToCart}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />

          ))}

        </div>

      </div>

      {/* <Footer /> */}

    </div>

  );

}

export default CategoryPage;
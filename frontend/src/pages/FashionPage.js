import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CategoryBar from "../components/CategoryBar";
import ProductCard from "../components/ProductCard";

function FashionPage({
  products,
  addToCart,
  toggleWishlist,
  wishlist,
  cartCount,
  setSearch,
  search,
  selectedCategory,
  setSelectedCategory
}) {

  const filteredProducts = products.filter(product => {

    const matchCategory =
      selectedCategory === "For You" ||
      product.category === selectedCategory;

    const matchSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;

  });

  return (
    <div>

      <Navbar cartCount={cartCount} setSearch={setSearch} />

     <CategoryBar 
  setSelectedCategory={setSelectedCategory} 
  defaultCategory="Fashion"
/>

      <div className="container mt-4">

        <h2 className="mb-4">Fashion</h2>

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

      <Footer />

    </div>
  );
}

export default FashionPage;
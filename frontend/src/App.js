import ProductCard from "./components/ProductCard";
import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import laptop from "./images/laptop.jpg";
import CategoryBar from "./components/CategoryBar";
import CategoryProducts from "./components/CategoryProducts";
import phone from "./images/phone.jpg";
import headphone from "./images/headphone.jpg";
import watch from "./images/watch.jpg";
import tablet from "./images/tablet.jpg";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import WishlistPage from "./components/WishlistPage";
import CartPage from "./components/CartPage";
import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";
import ProductSlider from "./components/ProductSlider";
import CategorySection from "./components/CategorySection";
import { useLocation } from "react-router-dom";
import FashionPage from "./pages/FashionPage";
import CategoryPage from "./components/CategoryPage";
import MultiBannerSlider from "./components/MultiBannerSlider";
import BrandBanner from "./components/BrandBanner";
import CheckoutPage from "./components/CheckoutPage";
import Profile from "./pages/Profile";
import OrdersPage from "./pages/OrdersPage";










function App() {
  


 


  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {

        setProducts(data);

        // remove deleted products from cart
        setCartItems(prevCart =>
          prevCart.filter(cartItem =>
            data.some(p => p.id === cartItem.id)
          )
        );

        // remove deleted products from wishlist
        setWishlist(prevWishlist =>
          prevWishlist.filter(w =>
            data.some(p => p.id === w.id)
          )
        );

      })
      .catch(err => console.log(err));
  }, []);

  // CART STORAGE

  
 const [cartItems, setCartItems] = useState([]);
useEffect(() => {

const user = JSON.parse(localStorage.getItem("user"));

if(user){

const savedCart = localStorage.getItem(`cart_${user.email}`);

if(savedCart){
setCartItems(JSON.parse(savedCart));
}else{
setCartItems([]);
}

} else {
setCartItems([]);
}

}, []);



useEffect(() => {

const user = JSON.parse(localStorage.getItem("user"));

if(user){
localStorage.setItem(
`cart_${user.email}`,
JSON.stringify(cartItems)
);
}

}, [cartItems]);


  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);


  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("For You");
  const [sortOption, setSortOption] = useState("");
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });



 
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);



  // ADD TO CART
 const addToCart = (product) => {

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Please login first");
return;
}

    const existingProduct = cartItems.find(item => item.name === product.name);

    if (existingProduct) {

      const updatedCart = cartItems.map(item =>
        item.name === product.name
          ? { ...item, qty: item.qty + 1 }
          : item
      );

      setCartItems(updatedCart);

    } else {

      setCartItems([...cartItems, { ...product, qty: 1 }]);

    }

  };



  // INCREASE QTY
  const increaseQty = (index) => {

    const updated = [...cartItems];
    updated[index].qty += 1;

    setCartItems(updated);

  };

  // DECREASE QTY
  const decreaseQty = (index) => {

    const updated = [...cartItems];

    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
    }

    setCartItems(updated);

  };

  
  // REMOVE CART ITEM
  const removeFromCart = (index) => {

    const updatedCart = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCart);

  };

  // WISHLIST
  const toggleWishlist = (product) => {

    const exists = wishlist.find(item => item.name === product.name);

    if (exists) {
      setWishlist(wishlist.filter(item => item.name !== product.name));
    } else {
      setWishlist([...wishlist, product]);
    }

  };


  const location = useLocation();

useEffect(() => {

  if (location.pathname === "/") {
    setSelectedCategory("For You");
  }

}, [location]);





  return (


    

    <Routes>


     <Route
  path="/category/:categoryName"
  element={
    <CategoryPage
      products={products}
      addToCart={addToCart}
      toggleWishlist={toggleWishlist}
      wishlist={wishlist}
      cartCount={cartCount}
      setSearch={setSearch}
      search={search}
    />
  }
/>


<Route path="/orders" element={<OrdersPage />} />

<Route path="/profile" element={<Profile />} />

<Route
path="/checkout"
element={
<CheckoutPage
cart={cartItems}
cartCount={cartCount}
increaseQty={increaseQty}
decreaseQty={decreaseQty}
removeFromCart={removeFromCart}
setSearch={setSearch}
setSelectedCategory={setSelectedCategory}
/>
}
/>







      <Route path="/admin" element={<AdminPage />} />



      <Route
  path="/fashion"
  element={
    <FashionPage
      products={products}
      addToCart={addToCart}
      toggleWishlist={toggleWishlist}
      wishlist={wishlist}
      cartCount={cartCount}
      setSearch={setSearch}
      search={search}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />
  }
/>
  

      <Route
        path="/cart"
        element={
          <CartPage
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            setSearch={setSearch}
            cartCount={cartCount} 
              search={search}
              setSelectedCategory={setSelectedCategory}
          />
        }
      />

     <Route
  path="/wishlist"
  element={
    <WishlistPage
      wishlist={wishlist}
      toggleWishlist={toggleWishlist}
      addToCart={addToCart}
      setSearch={setSearch}
      search={search}
      cartCount={cartCount}
    />
  }
/>

      <Route
        path="/"
        element={

          <div>

            <Navbar cartCount={cartCount} setSearch={setSearch} />

            <CategoryBar setSelectedCategory={setSelectedCategory} />

           <MultiBannerSlider />

           <CategoryProducts />


<BrandBanner />


<ProductSlider products={products} />

             <CategorySection setSelectedCategory={setSelectedCategory} />
            

           <div className="container-fluid">

              <div className="d-flex justify-content-end mb-3">

                <select
                  className="form-select w-auto"
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">Sort By</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>

              </div>

              <div className="row">

                {[...products]
                 .filter(product =>
  (product.showInHome === 1 || product.showInHome === true) &&
  product.name.toLowerCase().includes(search.toLowerCase())
)
                  .sort((a, b) => {

                    if (sortOption === "low") return a.price - b.price;
                    if (sortOption === "high") return b.price - a.price;
                    if (sortOption === "rating") return b.rating - a.rating;

                    return 0;

                  })
                  .map((product, index) => (

                    <ProductCard
                      key={index}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      rating={product.rating}
                      image={`/images/${product.image}`}
                      addToCart={() => addToCart({ ...product, image: `/images/${product.image}` })}
                      toggleWishlist={() => toggleWishlist({ ...product, image: `/images/${product.image}` })}
                      wishlist={wishlist}
                    />

                  ))}

              </div>

              

              

            </div>

           

              <Footer />

          </div>

        }
      />

      <Route
        path="/product/:id"
        element={
          <ProductPage
            products={products}
            addToCart={addToCart}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
            cartCount={cartCount}
            
          />
        }
      />


      <Route path="/login" element={<LoginPage />} />



      <Route path="/signup" element={<SignupPage />} />


      <Route path="/dashboard" element={<AdminDashboard />} />

      


    

    </Routes>

  );

}

export default App;
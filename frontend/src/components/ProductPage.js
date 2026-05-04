import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductPage.css";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import Footer from "./Footer";
import ProductSidebar from "./ProductSidebar";

function ProductPage({ products, addToCart, cartCount, setSearch, setSelectedCategory }) {

  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));

  const [qty, setQty] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const [backgroundPos, setBackgroundPos] = useState("0% 0%");
  const [showZoom, setShowZoom] = useState(false);

  const [activeTab, setActiveTab] = useState("description");
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  useEffect(() => {

fetch(`http://localhost:5000/product-images/${id}`)
.then(res => res.json())
.then(data => {

const imgs = data.length
  ? data.map(i => `/images/${i.image}`)
  : [`/images/${product.image}`];

setImages(imgs);

});

}, [id, product]);
  

  if (!product) {
    return <h2 className="text-center mt-5">Product not found</h2>;
  }

  /* PRODUCT IMAGES */

const img = mainImage || images[0] || `/images/${product.image}`;

  /* MAIN IMAGE */

  // const img = mainImage || images[0];

  const handleMove = (e) => {

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;

    setBackgroundPos(`${x}% ${y}%`);
  };

  return (

<Layout cartCount={cartCount} setSearch={setSearch} setSelectedCategory={setSelectedCategory}>


<div className="product-page container-fluid">

  <div className="product-main-layout">

    <ProductSidebar/>

    <div className="product-content">
   

{/* BREADCRUMB */}

<div className="product-breadcrumb">

  <span onClick={() => navigate("/")}>Home</span>

  <span className="sep">›</span>

  <span onClick={() => navigate("/category/electronics")}>
    Electronics
  </span>

  <span className="sep">›</span>

  <span className="current">{product.name}</span>

</div>


<div className="product-layout">

{/* THUMBNAILS */}

<div className="thumbs">
{images.map((img,i)=>(
  <img
    key={i}
    src={img}
    alt=""
    onClick={()=>setMainImage(img)}
  />
))}
</div>


{/* MAIN IMAGE */}

<div
  className="image-small"
  onMouseMove={handleMove}
  onMouseEnter={()=>setShowZoom(true)}
  onMouseLeave={()=>setShowZoom(false)}
>

  <img src={img} alt={product.name}/>

</div>


{/* ZOOM */}

{showZoom && (

  <div
    className="zoom-preview"
    style={{
      backgroundImage:`url(${img})`,
      backgroundPosition:backgroundPos
    }}
  />

)}


{/* PRODUCT DETAILS */}

<div className="product-info">

<h1 className="product-title">{product.name}</h1>

<div className="rating">
{"⭐".repeat(product.rating)}
<span className="rating-count">(120 reviews)</span>
</div>

<div className="deal-badge">
Limited Time Deal
</div>

<div className="price-section">

<span className="price">₹{product.price}</span>

<span className="old-price">
₹{product.originalPrice}
</span>

<span className="discount">
{Math.round(((product.originalPrice-product.price)/product.originalPrice)*100)}% off
</span>

</div>

<div className="emi">
EMI starts at <b>₹2,500/month</b>
</div>

<div className="stock">
In Stock
</div>



<div className="qty-container">

<button
className="qty-btn"
onClick={()=>qty>1 && setQty(qty-1)}
>
-
</button>

<span className="qty-number">{qty}</span>

<button
className="qty-btn"
onClick={()=>setQty(qty+1)}
>
+
</button>




</div>

<div className="button-group">

<button
className="add-cart"
onClick={()=>{
for(let i=0;i<qty;i++){
addToCart(product)
}
}}
>
🛒 Add to Cart
</button>


<button className="buy-now">
⚡ Buy Now
</button>

</div>




</div>


{/* BUY BOX */}

<div className="buy-box">

{/* <div className="buy-price">
₹{product.price}
</div>

<p className="buy-stock">In Stock</p> */}






<div className="product-features">

  <div className="feature-item">
    <div className="feature-icon">🔧</div>
    <p>7-day<br/>brand support</p>
  </div>

  <div className="feature-item">
    <div className="feature-icon">₹</div>
    <p>Cash on<br/>Delivery</p>
  </div>

  {/* <div className="feature-item">
    <div className="feature-icon">🛡️</div>
    <p>Flipkart<br/>Assured</p>
  </div> */}

  <div className="feature-item">
    <div className="feature-icon">🚚</div>
    <p>Free<br/>Delivery</p>
  </div>

</div>

</div>

</div>



{/* PRODUCT TABS */}

<div className="product-tabs container-fluid">

  

<div className="tabs-header">

<button
className={activeTab === "description" ? "tab active" : "tab"}
onClick={() => setActiveTab("description")}
>
Description
</button>

<button
className={activeTab === "specs" ? "tab active" : "tab"}
onClick={() => setActiveTab("specs")}
>
Specifications
</button>

<button
className={activeTab === "reviews" ? "tab active" : "tab"}
onClick={() => setActiveTab("reviews")}
>
Reviews
</button>

</div>


<div className="tabs-content">

{activeTab === "description" && (

<div>

<h5>Product Description</h5>

<p>
This premium quality laptop is designed for performance,
durability and everyday productivity. With powerful hardware,
sleek design and long battery life, it is perfect for both
professional and personal use.
</p>

</div>

)}


{activeTab === "specs" && (

<div>

<h5>Specifications</h5>

<ul>

<li>Processor: Intel Core i7</li>
<li>RAM: 16GB</li>
<li>Storage: 512GB SSD</li>
<li>Display: 15.6 inch Full HD</li>
<li>Battery: Up to 10 hours</li>

</ul>

</div>

)}


{activeTab === "reviews" && (

<div>

<h5>Customer Reviews</h5>

<p>⭐ ⭐ ⭐ ⭐ ⭐ Amazing product!</p>
<p>⭐ ⭐ ⭐ ⭐ Very good performance.</p>
<p>⭐ ⭐ ⭐ Great value for money.</p>

</div>

)}

</div>

</div>


</div>

    </div>
  </div>





    </Layout>
    

    

  );

}

export default ProductPage;
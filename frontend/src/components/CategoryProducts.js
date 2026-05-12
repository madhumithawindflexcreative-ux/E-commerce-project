import "./CategoryProducts.css";

const categories = [
  { name: "Celeb Looks", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/d06994c0215187d2.jpg" },
  { name: "Shirts, Tshirts", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/c0b632c11f98c5ec.jpg" },
  { name: "Jeans", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/49ef41b43abf7107.jpg" },
  { name: "Sports Shoes", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/f133bcfd4c23c0f7.jpg" },
  { name: "Watches", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/d5b0c418793a3da9.jpg" },
  { name: "Kids Clothing", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/acc5053472daa9fa.jpg" },
  { name: "Trolley Bags", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/47378f9782d6946a.jpg" },
  { name: "Kurtas", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/29a0856f8be430c0.jpg" },
  { name: "Trunks & Vests", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/354cb8c33e9c1bc3.jpg" },
  { name: "Summer Wear", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/1d1bbacb9e904476.jpg" },
  
  { name: "Kurta Sets", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/e0e1695dd579b1dc.jpg" },
  { name: "Dresses", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/2918210c3ade6d83.jpg" },
  { name: "Casual Footwear", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/dd08ce24819679e5.jpg" },
  { name: "Backpacks", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/8dc27b051bef913f.jpg" },
  { name: "Jewellery", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/1f0f3ce437bdb28c.jpg" },
  { name: "Sarees", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/4c48ab7808491ea5.jpg" },
  { name: "Jeans, Trousers", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/83af8ccbb8268754.jpg" },
  { name: "Kurtis", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/6cf77f69dda4d4d9.jpg" },
  { name: "Sports Shoes", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/f133bcfd4c23c0f7.jpg" },
  { name: "Backpacks", image: "https://rukminim2.flixcart.com/fk-p-flap/196/196/image/8dc27b051bef913f.jpg" },
  
];

function CategoryProducts() {

  return (
    <div className="category-products-container">

      {categories.map((cat, index) => (
        <div key={index} className="category-product-card">

          <img src={cat.image} alt={cat.name} />

          <p>{cat.name}</p>

        </div>
      ))}

    </div>
  );
}

export default CategoryProducts;
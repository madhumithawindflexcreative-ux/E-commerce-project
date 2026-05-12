import React from "react";
import Layout from "./Layout";

function WishlistPage({ wishlist, toggleWishlist, addToCart, cartCount, setSelectedCategory, setSearch }) {

  return (


    <Layout cartCount={cartCount} setSearch={setSearch} setSelectedCategory={setSelectedCategory}>

      

    <div className="container mt-4">

      

      <h2 className="mb-4">My Wishlist ❤️</h2>

      {wishlist.length === 0 && (
        <p className="text-muted">Your wishlist is empty</p>
      )}

      {wishlist.map((item, index) => (

        <div
          key={index}
          className="d-flex align-items-center justify-content-between border p-3 mb-3"
        >

          <div className="d-flex align-items-center gap-3">

           <img
  src={item.image.startsWith("/images") ? item.image : `/images/${item.image}`}
  alt={item.name}
  style={{ width: "60px" }}
/>

            <div>
              <h6 className="mb-0">{item.name}</h6>
              <small>₹{item.price}</small>
            </div>

          </div>

          <div className="d-flex gap-2">

            <button
              className="btn btn-primary btn-sm"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => toggleWishlist(item)}
            >
              Remove
            </button>

          </div>

        </div>

      ))}

    </div>
    </Layout>

  );

}

export default WishlistPage;
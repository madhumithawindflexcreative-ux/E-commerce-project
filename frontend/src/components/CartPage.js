import React from "react";
import Navbar from "../components/Navbar";
import CategoryBar from "../components/CategoryBar";
import { useNavigate } from "react-router-dom";

function CartPage({
  cartItems,
  removeFromCart,
  increaseQty,
  decreaseQty,
  cartCount,
  setSearch,
  search
}) {

  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (




    <>
      {/* Navbar */}
      <Navbar cartCount={cartCount} setSearch={setSearch} search={search} />

      {/* Category Bar */}
      <CategoryBar />

      <div className="container mt-5">

        

        <h2 className="mb-4">Cart Items</h2>

        {cartItems.length === 0 && (
          <p className="text-muted">Your cart is empty</p>
        )}

        {cartItems.map((item, index) => (

          <div
            key={index}
            className="d-flex align-items-center justify-content-between border p-3 mb-3"
          >

            <div className="d-flex align-items-center gap-3">

            <img
  src={item.image.includes("/images/") ? item.image : `/images/${item.image}`}
  alt={item.name}
  style={{ width: "60px" }}
/>
              <div>

                <h6 className="mb-0">{item.name}</h6>

                <small>₹{item.price}</small>

                <div className="d-flex align-items-center gap-2 mt-1">

                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => decreaseQty(index)}
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => increaseQty(index)}
                  >
                    +
                  </button>

                </div>

              </div>

            </div>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeFromCart(index)}
            >
              Remove
            </button>

          </div>

        ))}

        {cartItems.length > 0 && (

          <div className="text-end mt-4">

            <h4>Total: ₹{total}</h4>

            <button
  className="btn btn-success"
  onClick={() => navigate("/checkout")}
>
  Proceed to Checkout
</button>

          </div>

        )}

      </div>

    </>

  );

}

export default CartPage;
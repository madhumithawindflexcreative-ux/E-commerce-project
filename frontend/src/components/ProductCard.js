import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function ProductCard(props) {

  const navigate = useNavigate();

  const discount =
    Math.round(
      ((props.originalPrice - props.price) / props.originalPrice) * 100
    );

  const isWishlisted =
    props.wishlist?.find(item => item.id === props.id); // ✅ fixed

  return (

    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">

      <div
        className="card h-100 shadow-sm position-relative"
        style={{ cursor: "pointer" }}

        onClick={() => navigate(`/product/${props.id}`)}
      >

        {/* WISHLIST HEART */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            zIndex: 10
          }}
          onClick={(e) => {
            e.stopPropagation();
            props.toggleWishlist({
              id: props.id,
              name: props.name,
              price: props.price,
              image: props.image.replace("/images/", "")
            });
          }}
        >
          <FaHeart color={isWishlisted ? "red" : "#ccc"} />
        </div>

        <img
  src={props.image.includes("/") ? props.image : `/images/${props.image}`}
  className="card-img-top p-3"
  alt={props.name}
  style={{ height: "200px", objectFit: "contain" }}
/>
        <div className="card-body text-center">

          <h6 className="card-title">{props.name}</h6>

          <div className="text-warning mb-2">
            {"⭐".repeat(props.rating)}
          </div>

          <h6 className="fw-bold">
            ₹{props.price}

            <span className="text-muted text-decoration-line-through ms-2">
              ₹{props.originalPrice}
            </span>

            <span className="text-success ms-2">
              {discount}% off
            </span>

          </h6>

          <button
            className="btn btn-primary btn-sm mt-2"
            onClick={(e) => {
              e.stopPropagation();
             props.addToCart({
  id: props.id,
  name: props.name,
  price: props.price,
  image: props.image.replace("/images/", "")
});
            }}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>

  );

}

export default ProductCard;
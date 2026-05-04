import "./Navbar.css";
import { useState } from "react";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaChevronDown,
  FaBell,
  FaHeadset,
  FaBullhorn,
  FaMobileAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar({ cartCount, setSearch, search }) {

  const [showDropdown, setShowDropdown] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Get current location
  const getCurrentLocation = () => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        (position) => {

          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          setLocation(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);

          setShowLocationModal(false);

        },

        () => {
          alert("Unable to get location");
        }

      );

    } else {

      alert("Geolocation not supported");

    }

  };

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 sticky-top shadow-sm">

      {/* Logo */}
      <a className="navbar-brand fw-bold text-primary" href="/">
        Buykart
      </a>

      {/* Location */}
      <div
        className="location-box"
        onClick={() => setShowLocationModal(true)}
      >
        📍 {location ? location : "Location not set"}
      </div>

      {/* Search */}
      <div className="search-container mx-auto">

        <input
          type="text"
          className="form-control"
          placeholder="Search for Products, Brands and More"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Right Menu */}
      <div className="d-flex align-items-center gap-4">

        {/* Login Dropdown */}
        <div style={{ color: "#2500aa" }}
          className="nav-item position-relative"
          onClick={(e) => {
            e.stopPropagation();
            setShowDropdown(!showDropdown);
            setShowMore(false);
          }}
        >

          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <span className="ms-1">
              {user ? user.name : "Login"}
            </span>
          </Link>

          <FaChevronDown
            className={`login-arrow ${showDropdown ? "rotate" : ""}`}
          />

          {showDropdown && (

            <div className="login-dropdown">

  <div className="dropdown-header">
    <span>New customer?</span>
    <Link to="/signup" className="signup-link">Sign Up</Link>
  </div>

  <div className="dropdown-divider"></div>

  <div className="dropdown-item"><a href="/profile">
👤 My Account
</a></div>
  <div className="dropdown-item" onClick={()=>window.location="/orders"}>📦 Orders</div>
  <div className="dropdown-item">🏆 Rewards</div>
  <div className="dropdown-item">🎁 Gift Cards</div>
  <div className="dropdown-item">🏷 Coupons</div>

  <div
    className="dropdown-item"
    onClick={() => {
      localStorage.removeItem("user");
      window.location.reload();
    }}
  >
    🚪 Logout
  </div>

</div>
            

          )}

        </div>

        


        {/* More Dropdown */}
        <div
          className="nav-item position-relative"
          onClick={(e) => {
            e.stopPropagation();
            setShowMore(!showMore);
            setShowDropdown(false);
          }}
        >

          More
          <FaChevronDown className={`login-arrow ${showMore ? "rotate" : ""}`} />

          {showMore && (

            <div className="login-dropdown">

              <div className="dropdown-item">
                <FaBell className="dropdown-icon" style={{ color: "#ff9800" }} />
                Notifications
              </div>

              <div className="dropdown-item">
                <FaHeadset className="dropdown-icon" style={{ color: "#4caf50" }} />
                Customer Care
              </div>

              <div className="dropdown-item">
                <FaBullhorn className="dropdown-icon" style={{ color: "#e91e63" }} />
                Advertise
              </div>

              <div className="dropdown-item">
                <FaMobileAlt className="dropdown-icon" style={{ color: "#2874f0" }} />
                Download App
              </div>

            </div>
          )}

        </div>
        

        {/* Wishlist */}
        <div
          className="nav-item"
          onClick={() => navigate("/wishlist")}
          style={{ cursor: "pointer", color: "red" }}
        >
          <FaHeart /> Wishlist
        </div>

        {/* Cart */}
        <div
          className="nav-item cart-box"
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer", position: "relative", color: "brown" }}
        >

          <FaShoppingCart /> Cart

          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-10px",
                background: "red",
                color: "white",
                fontSize: "12px",
                borderRadius: "50%",
                padding: "3px 7px"
              }}
            >
              {cartCount}
            </span>
          )}

        </div>

      </div>


      {/* Location Modal */}
      {showLocationModal && (

        <div className="location-modal-overlay">

          <div className="location-modal">

            <div className="modal-header">

              <h5>Select delivery address</h5>

              <span
                className="close-btn"
                onClick={() => setShowLocationModal(false)}
              >
                ✕
              </span>

            </div>

            <input
              type="text"
              placeholder="Search by area, street name, pin code"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="location-input"
            />

            <div
              className="use-location"
              onClick={getCurrentLocation}
            >
              📍 Use my current location
              <p>Allow access to location</p>
            </div>

            <hr />

            <div className="saved-address">
              <h6>Saved addresses</h6>
              <p>Login to see saved addresses</p>
            </div>

          </div>

        </div>

      )}

    </nav>

  );

}

export default Navbar;
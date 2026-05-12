import "./CategoryBar.css";
import { useState } from "react";
import {
  FaMobileAlt,
  FaTshirt,
  FaLaptop,
  FaCouch,
  FaBlender,
  FaBaby,
  FaCar,
  FaMotorcycle,
  FaFootballBall,
  FaBook,
  FaShoppingBasket
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";

function CategoryBar({ setSelectedCategory = () => {}, defaultCategory = "For You" }) {

  const navigate = useNavigate();
  const { categoryName } = useParams();

  
const location = useLocation();


  const categories = [
    { name: "For You", icon: "👜" },
    { name: "Fashion", icon: <FaTshirt style={{ color: "#ff6f61" }} /> },
    { name: "Mobiles", icon: <FaMobileAlt style={{ color: "#2874f0" }} /> },
    { name: "Beauty", icon: "💄" },
    { name: "Electronics", icon: <FaLaptop style={{ color: "#6c63ff" }} /> },
    { name: "Home", icon: <FaCouch style={{ color: "#ff9800" }} /> },
    { name: "Appliances", icon: <FaBlender style={{ color: "#00bcd4" }} /> },
    { name: "Toys & Baby", icon: <FaBaby style={{ color: "#ff4081" }} /> },
    { name: "Food & Health", icon: <FaShoppingBasket style={{ color: "#4caf50" }} /> },
    { name: "Auto Accessories", icon: <FaCar style={{ color: "#795548" }} /> },
    { name: "2 Wheelers", icon: <FaMotorcycle style={{ color: "#e91e63" }} /> },
    { name: "Sports", icon: <FaFootballBall style={{ color: "#009688" }} /> },
    { name: "Books", icon: <FaBook style={{ color: "#673ab7" }} /> }
  ];

  const defaultIndex = categories.findIndex(
    c => c.name === defaultCategory
  );

 const active = location.pathname === "/"
  ? 0
  : categories.findIndex(
      c => c.name.toLowerCase() === categoryName
    );


 const handleCategoryClick = (index, name) => {

  setSelectedCategory(name);

  if (name === "For You") {

    setSelectedCategory("For You");  // reset filter
    navigate("/");

  } else {

    navigate(`/category/${name.toLowerCase()}`);

  }

};

  return (

    <div className="category-bar">

      {categories.map((cat, index) => (

        <div
          key={index}
          className={`category-item ${active === index ? "active-category" : ""}`}
          onClick={() => handleCategoryClick(index, cat.name)}
        >

          <div className="category-icon">
            {cat.icon}
          </div>

          <p>{cat.name}</p>

        </div>

      ))}

    </div>

  );

}

export default CategoryBar;
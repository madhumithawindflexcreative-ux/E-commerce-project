import "./CategorySection.css";
import { useNavigate } from "react-router-dom";


function CategorySection({ setSelectedCategory }) {

  const items = [
    { name: "True Wireless", image: "/images/Airpods.jpg" },
    { name: "Trimmers", image: "/images/trimmer.jpeg" },
    { name: "Neckband", image: "/images/neckband.jpg" },
    { name: "Power Banks", image: "/images/powerbank.jpg" }
  ];

  const navigate = useNavigate();

  return (
    <div className="category-section">

      <div className="section-header">
        <h3>Best Gadgets & Appliances</h3>
      <button
  className="arrow-btn"
  onClick={() => navigate("/category/electronics")}
>
  →
</button>
      </div>

      <div className="section-content">

        {items.map((item, index) => (

          <div className="category-card" key={index}>

            <img src={item.image} alt={item.name} />

            <p>{item.name}</p>

            <span>Min. 50% Off</span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CategorySection;
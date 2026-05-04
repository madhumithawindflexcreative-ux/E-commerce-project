import "./ProductSidebar.css";
function ProductSidebar() {

  return (

    <div className="product-sidebar">

      <h5 className="filter-title">Filters</h5>

      {/* CATEGORY */}

      <div className="filter-block">
        <h6>CATEGORIES</h6>
        <p>Electronics</p>
        <p>Mobiles</p>
        <p>Laptops</p>
      </div>

      {/* BRAND */}

      <div className="filter-block">
        <h6>BRAND</h6>

        <label>
          <input type="checkbox"/> Apple
        </label>

        <label>
          <input type="checkbox"/> Samsung
        </label>

        <label>
          <input type="checkbox"/> Lenovo
        </label>

        <label>
          <input type="checkbox"/> Dell
        </label>

        <label>
          <input type="checkbox"/> Asus
        </label>

      </div>

      {/* PRICE */}

      <div className="filter-block">
        <h6>PRICE</h6>

        <select>
          <option>Min</option>
          <option>₹5000</option>
          <option>₹10000</option>
          <option>₹20000</option>
        </select>

        <span> to </span>

        <select>
          <option>₹10000</option>
          <option>₹20000</option>
          <option>₹50000</option>
          <option>₹100000</option>
        </select>

      </div>

      {/* RATINGS */}

      <div className="filter-block">
        <h6>Customer Ratings</h6>

        <label>
          <input type="checkbox"/> 4★ & above
        </label>

        <label>
          <input type="checkbox"/> 3★ & above
        </label>

      </div>

      {/* DISCOUNT */}

      <div className="filter-block">
        <h6>Discount</h6>

        <label>
          <input type="checkbox"/> 10% or more
        </label>

        <label>
          <input type="checkbox"/> 30% or more
        </label>

        <label>
          <input type="checkbox"/> 50% or more
        </label>

      </div>

    </div>

  );

}

export default ProductSidebar;
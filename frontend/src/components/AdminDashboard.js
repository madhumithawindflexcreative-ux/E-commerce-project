import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import AdminSidebar from "./AdminSidebar";

function AdminDashboard() {

  const [page, setPage] = useState("dashboard");

  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0
  });

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    rating: "",
    image: "",
    images: "",
    category: "",
    showInHome: false
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {

    fetch("http://localhost:5000/admin-stats")
      .then(res => res.json())
      .then(data => setStats(data));

    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch("http://localhost:5000/orders")
      .then(res => res.json())
      .then(data => setOrders(data));

  }, []);

  const addProduct = () => {

    if (product.id) {

      fetch(`http://localhost:5000/update-product/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(() => {
        alert("Product Updated");
        window.location.reload();
      });

    } else {

      fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
      })
      .then(res => res.json())
      .then(() => {
        alert("Product Added");
        window.location.reload();
      });

    }

  };

  const deleteProduct = (id) => {

    fetch(`http://localhost:5000/delete-product/${id}`, {
      method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
      setProducts(products.filter(p => p.id !== id));
    });

  };

  const editProduct = (p) => {

  setProduct({
    id: p.id,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    rating: p.rating,
    image: p.image,
    images: p.images || "",
    category: p.category,
    showInHome: p.showInHome || false
  });

};


  const handleImageUpload = (e) => {

  const formData = new FormData();

  for (let i = 0; i < e.target.files.length; i++) {
    formData.append("images", e.target.files[i]);
  }

  fetch("http://localhost:5000/upload-images", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {

    setProduct({
      ...product,
      images: data.images.join(","),
      image: data.images[0]
    });

  });

};

  return (

    <div className="admin-layout">

      <AdminSidebar setPage={setPage} page={page} />

      <div className="admin-content">

        {/* DASHBOARD */}

        {page === "dashboard" && (

          <div>

            <h2>Dashboard</h2>

            <div className="admin-cards">

              <div className="admin-card">
                <h3>Total Products</h3>
                <p>{stats.products || 0}</p>
              </div>

              <div className="admin-card">
                <h3>Total Users</h3>
                <p>{stats.users || 0}</p>
              </div>

              <div className="admin-card">
                <h3>Total Orders</h3>
                <p>{stats.orders || 0}</p>
              </div>

            </div>

          </div>

        )}

        {/* PRODUCTS */}

        {page === "products" && (

          <div>

            <h2>Products Management</h2>

            <div className="admin-form">

              <input
                name="name"
                placeholder="Name"
                value={product.name}
                onChange={handleChange}
              />

              <input
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
              />

              <input
                name="originalPrice"
                placeholder="Original Price"
                value={product.originalPrice}
                onChange={handleChange}
              />

              <input
                name="rating"
                placeholder="Rating"
                value={product.rating}
                onChange={handleChange}
              />

              {/* CURRENT IMAGE PREVIEW */}

              {product.image && (
  <div style={{ marginBottom: "10px" }}>
    <p>Current Image:</p>
    <img
      src={`/images/${product.image}`}
      alt="preview"
      style={{ width: "80px", borderRadius: "6px" }}
    />
  </div>
)}

<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setProduct({
      ...product,
      image: e.target.files[0].name
    })
  }
/>

              {/* CATEGORY */}

              <select
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Fashion">Fashion</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Beauty">Beauty</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home</option>
                <option value="Appliances">Appliances</option>
                <option value="Toys & Baby">Toys & Baby</option>
                <option value="Food & Health">Food & Health</option>
                <option value="Auto Accessories">Auto Accessories</option>
                <option value="2 Wheelers">2 Wheelers</option>
                <option value="Sports">Sports</option>
                <option value="Books">Books</option>
              </select>

              {/* SHOW IN HOME */}

              <label style={{ display: "block", marginTop: "10px" }}>
                <input
                  type="checkbox"
                  checked={product.showInHome || false}
                  onChange={(e) =>
                    setProduct({ ...product, showInHome: e.target.checked })
                  }
                />
                Show in Home Page
              </label>

              <button onClick={addProduct}>
                {product.id ? "Update Product" : "Add Product"}
              </button>

            </div>

            <h3 className="mt-4">All Products</h3>

            {products.map(p => (

              <div key={p.id} className="admin-product">

                <div className="product-info">

                  <img
                    src={`/images/${p.image}`}
                    alt={p.name}
                    className="admin-product-img"
                  />

                  <div>

                    <strong>{p.name}</strong>

                    <p className="product-price">
                      ₹{p.price}
                    </p>

                  </div>

                </div>

                <div className="product-actions">

                  <button
                    className="edit-btn"
                    onClick={() => editProduct(p)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* ORDERS */}

        {page === "orders" && (

          <div>

            <h2>Orders</h2>

            <table className="admin-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>

              <tbody>

                {orders.map(order => (

                  <tr key={order.id}>

                    <td>{order.id}</td>
                    <td>{order.user_email}</td>
                    <td>{order.product_name}</td>
                    <td>₹{order.price}</td>
                    <td>{order.quantity}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}

export default AdminDashboard;
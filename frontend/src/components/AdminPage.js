import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function AdminPage() {



  

  const [product, setProduct] = useState({
    name: "",
    price: "",
    originalPrice: "",
    rating: "",
    image: "",
    category: ""
  });


  const [orders, setOrders] = useState([]);
  useEffect(() => {

  fetch("http://localhost:5000/orders")
    .then(res => res.json())
    .then(data => setOrders(data));

}, []);

  const navigate = useNavigate();

useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    navigate("/");
  }

}, []);






const [stats, setStats] = useState({
  products: 0,
  users: 0
});


useEffect(() => {

  fetch("http://localhost:5000/admin-stats")
    .then(res => res.json())
    .then(data => setStats(data));

}, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const addProduct = () => {

    fetch("http://localhost:5000/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(data => {
        alert("Product Added");

        fetch("http://localhost:5000/products")
    .then(res => res.json())
    .then(data => setProducts(data));
      })
      .catch(err => console.log(err));

  };

  const [products, setProducts] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/products")
    .then(res => res.json())
    .then(data => setProducts(data));
}, []);


const deleteProduct = (id) => {
  console.log("Attempting to delete product with ID:", id); // Check your console!

  if (window.confirm("Are you sure you want to delete this product?")) {
    fetch(`http://localhost:5000/delete-product/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server response:", data);
        alert("Product Deleted");
        // Update the list immediately
       setProducts((prevProducts) =>
  prevProducts.filter((p) => p.id !== id)
);
      })
      .catch((err) => console.log("Fetch error:", err));
  }
};

const [editingProduct, setEditingProduct] = useState(null);

const updateProduct = () => {

  fetch(`http://localhost:5000/update-product/${editingProduct.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
    .then(res => res.json())
    .then(data => {

      alert("Product Updated");

      fetch("http://localhost:5000/products")
        .then(res => res.json())
        .then(data => setProducts(data));

      setEditingProduct(null);

    });

};

  return (

    <div className="container mt-5">




      

      <h2>Add Product</h2>

      <input
  name="name"
  placeholder="Name"
  value={product.name}
  onChange={handleChange}
  className="form-control mb-2"
/>

<input
  name="price"
  placeholder="Price"
  value={product.price}
  onChange={handleChange}
  className="form-control mb-2"
/>

<input
  name="originalPrice"
  placeholder="Original Price"
  value={product.originalPrice}
  onChange={handleChange}
  className="form-control mb-2"
/>

<input
  name="rating"
  placeholder="Rating"
  value={product.rating}
  onChange={handleChange}
  className="form-control mb-2"
/>

<input
  name="image"
  placeholder="Image name"
  value={product.image}
  onChange={handleChange}
  className="form-control mb-2"
/>

<input
  name="category"
  placeholder="Category"
  value={product.category}
  onChange={handleChange}
  className="form-control mb-2"
/>
      <button
  className="btn btn-primary"
  onClick={editingProduct ? updateProduct : addProduct}
>
  {editingProduct ? "Update Product" : "Add Product"}
</button>








      <h3 className="mt-5">All Products</h3>

{products.map((p) => (

  <div key={p.id} className="border p-3 mb-2 d-flex justify-content-between">

    <div>
      <b>{p.name}</b> - ₹{p.price}
    </div>

    <div>

<button
  className="btn btn-warning me-2"
  onClick={() => {
    setEditingProduct(p);
    setProduct(p);
  }}
>
  Edit
</button>

<button
  className="btn btn-danger"
  onClick={() => deleteProduct(p.id)}
>
  Delete
</button>

</div>

  </div>

))}



<div className="row mb-4">

  <div className="col-md-4">
    <div className="card text-center p-3 shadow">
      <h5>Total Products</h5>
      <h2>{stats.products}</h2>
    </div>
  </div>

  <div className="col-md-4">
    <div className="card text-center p-3 shadow">
      <h5>Total Users</h5>
      <h2>{stats.users}</h2>
    </div>
  </div>

</div>



<h3 className="mt-5">Orders</h3>

<table className="table table-bordered">

<thead>
<tr>
<th>ID</th>
<th>User Email</th>
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




  );

}

export default AdminPage;
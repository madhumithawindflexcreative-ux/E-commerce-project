import "./AdminDashboard.css";

function AdminSidebar({ setPage, page }) {

  return (

    <div className="admin-sidebar">

      <h3 className="admin-logo">Admin</h3>

      <ul>

        <li
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Dashboard
        </li>

        <li
          className={page === "products" ? "active" : ""}
          onClick={() => setPage("products")}
        >
          Products
        </li>

        <li
          className={page === "orders" ? "active" : ""}
          onClick={() => setPage("orders")}
        >
          Orders
        </li>

        <li
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
        >
          Logout
        </li>

      </ul>

    </div>

  );

}

export default AdminSidebar;
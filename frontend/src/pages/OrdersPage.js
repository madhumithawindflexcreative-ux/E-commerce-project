import { useEffect, useState } from "react";
import "./OrdersPage.css";

function OrdersPage(){

const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;

const [orders,setOrders] = useState([]);

useEffect(()=>{

if(user?.email){

fetch(`http://localhost:5000/api/orders/${user.email}`)
.then(res=>res.json())
.then(data=>setOrders(data));

}

},[user]);

if(!user){
return <h2 style={{padding:"40px"}}>Please login first</h2>;
}

return(

<div className="orders-page">

{/* LEFT FILTERS */}

<div className="order-filters">

<h3>Filters</h3>

<h4>Order Status</h4>

<label><input type="checkbox"/> On the way</label>
<label><input type="checkbox"/> Delivered</label>
<label><input type="checkbox"/> Cancelled</label>
<label><input type="checkbox"/> Returned</label>

<h4>Order Time</h4>

<label><input type="checkbox"/> Last 30 days</label>
<label><input type="checkbox"/> 2024</label>
<label><input type="checkbox"/> 2023</label>

</div>


{/* RIGHT ORDERS */}

<div className="orders-list">

<h2>My Orders</h2>

{orders.map((order)=>(

    

<div className="order-card" key={order.id}>

<div className="order-left">

<img
src={order.image}
className="order-img"
alt={order.product_name}
/>

<div className="order-details">

<h3>{order.product_name}</h3>

<p className="price">₹{order.price}</p>

<p className="qty">Quantity : {order.quantity}</p>

</div>

</div>


<div className="order-right">

<p className={`status ${order.status?.toLowerCase()}`}>
● {order.status}
</p>

<p className="delivery-text">
Your item is being processed
</p>

</div>

</div>

))}

</div>

</div>

);

}

export default OrdersPage;
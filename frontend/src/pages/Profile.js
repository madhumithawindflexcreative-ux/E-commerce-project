import "./Profile.css";
import { useEffect, useState } from "react";

function Profile(){

// SAFE USER FETCH
const userData = localStorage.getItem("user");
const user = userData ? JSON.parse(userData) : null;

const username = user?.email?.split("@")[0] || "User";
const firstLetter = username.charAt(0).toUpperCase();

const [orders,setOrders] = useState([]);
const [section,setSection] = useState("profile");
const [edit,setEdit] = useState(false);

const [profile,setProfile] = useState({
firstName:"",
lastName:"",
email:"",
phone:"",
gender:""
});

const [addresses,setAddresses] = useState([]);

const [newAddress,setNewAddress] = useState({
name:"",
phone:"",
city:"",
pincode:""
});


// FETCH USER ORDERS
useEffect(()=>{

if(user?.email){

fetch(`http://localhost:5000/api/orders/${user.email}`)
.then(res=>res.json())
.then(data=>setOrders(data));

}

},[user]);



const handleChange = (e)=>{
setProfile({...profile,[e.target.name]:e.target.value});
};


const addAddress = ()=>{

if(!newAddress.name || !newAddress.phone || !newAddress.city || !newAddress.pincode){
alert("Please fill all fields");
return;
}

setAddresses([...addresses,newAddress]);

setNewAddress({
name:"",
phone:"",
city:"",
pincode:""
});

};


// STOP PAGE IF NOT LOGGED IN
if(!user){
return <h2 style={{padding:"40px"}}>Please login first</h2>;
}



return(

<div className="account-page">


{/* LEFT SIDEBAR */}

<div className="account-sidebar">

<div className="user-box">

<div className="avatar">
{firstLetter}
</div>

<p>Hello,</p>

<h4>{user.email?.split("@")[0]}</h4>

</div>


<div className="sidebar-section">

<h4>ACCOUNT SETTINGS</h4>

<ul>

<li
className={section==="profile" ? "active":""}
onClick={()=>setSection("profile")}
>
Profile Information
</li>

<li
className={section==="address" ? "active":""}
onClick={()=>setSection("address")}
>
Manage Addresses
</li>


<li
className={section==="orders" ? "active":""}
onClick={()=>window.location="/orders"}
>
My Orders
</li>

<li>PAN Card Information</li>

</ul>

</div>

</div>



{/* RIGHT CONTENT */}

<div className="account-content">


{/* PROFILE SECTION */}

{section==="profile" && (

<div>

<h2>
Personal Information
<span onClick={()=>setEdit(!edit)}>
{edit ? "Save" : "Edit"}
</span>
</h2>


<div className="name-fields">

<input
name="firstName"
placeholder="First Name"
value={profile.firstName}
onChange={handleChange}
disabled={!edit}
/>

<input
name="lastName"
placeholder="Last Name"
value={profile.lastName}
onChange={handleChange}
disabled={!edit}
/>

</div>


<div className="gender">

<p>Your Gender</p>

<label>

<input
type="radio"
name="gender"
value="Male"
checked={profile.gender==="Male"}
onChange={handleChange}
disabled={!edit}
/>

Male

</label>


<label>

<input
type="radio"
name="gender"
value="Female"
checked={profile.gender==="Female"}
onChange={handleChange}
disabled={!edit}
/>

Female

</label>

</div>


<h3>Email Address</h3>

<input
className="info-input"
name="email"
placeholder="Email"
value={profile.email}
onChange={handleChange}
disabled={!edit}
/>


<h3>Mobile Number</h3>

<input
className="info-input"
name="phone"
placeholder="Phone Number"
value={profile.phone}
onChange={handleChange}
disabled={!edit}
/>

</div>

)}



{/* ADDRESS SECTION */}

{section==="address" && (

<div>

<h2>Manage Addresses</h2>


<div className="address-form">

<input
placeholder="Name"
value={newAddress.name}
onChange={(e)=>setNewAddress({...newAddress,name:e.target.value})}
/>

<input
placeholder="Phone"
value={newAddress.phone}
onChange={(e)=>setNewAddress({...newAddress,phone:e.target.value})}
/>

<input
placeholder="City"
value={newAddress.city}
onChange={(e)=>setNewAddress({...newAddress,city:e.target.value})}
/>

<input
placeholder="Pincode"
value={newAddress.pincode}
onChange={(e)=>setNewAddress({...newAddress,pincode:e.target.value})}
/>


<button onClick={addAddress}>
Add Address
</button>

</div>


<div className="address-list">

{addresses.map((addr,i)=>(

<div key={i} className="address-card">

<p><b>{addr.name}</b></p>

<p>{addr.phone}</p>

<p>{addr.city}</p>

<p>{addr.pincode}</p>

</div>

))}

</div>

</div>

)}



{/* ORDERS SECTION */}

{section==="orders" && (

<div>

<h2>My Orders</h2>

<div className="orders-list">

{orders.map((order,i)=>(

<div key={i} className="order-card">

<div className="order-details">

<h4>{order.product_name}</h4>

<p>Price: ₹{order.price}</p>

<p>Quantity: {order.quantity}</p>

<p>Order ID: {order.id}</p>

<p className={`status ${order.status?.toLowerCase()}`}>
{order.status}
</p>

</div>

</div>

))}

</div>

</div>

)}

</div>

</div>

);

}

export default Profile;
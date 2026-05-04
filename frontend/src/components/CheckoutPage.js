import { useState } from "react";
import "./CheckoutPage.css";
import Layout from "./Layout";

function CheckoutPage({
cart = [],
cartCount,
setSearch,
setSelectedCategory,
increaseQty,
decreaseQty,
removeFromCart
}) {

const [delivery, setDelivery] = useState("");
const [payment, setPayment] = useState("");

const [coupon, setCoupon] = useState("");
const [discount, setDiscount] = useState(100);

const [form, setForm] = useState({
name: "",
address: "",
city: "",
pincode: "",
phone: ""
});

const subtotal = cart.reduce(
(sum, item) => sum + item.price * (item.qty || 1),
0
);

const deliveryCharge = delivery === "express" ? 99 : 0;

const total = Math.max(0, subtotal + deliveryCharge - discount);

const handleChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const applyCoupon = () => {

if(coupon === "SAVE100"){
setDiscount(100);
alert("Coupon Applied!");
}

else if(coupon === "SAVE500"){
setDiscount(500);
alert("Coupon Applied!");
}

else{
alert("Invalid Coupon");
}

};
const placeOrder = async () => {

if(!form.name || !form.address || !form.city || !form.phone){
alert("Please fill shipping address");
return;
}

if(!delivery){
alert("Please select delivery option");
return;
}

if(!payment){
alert("Please select payment method");
return;
}

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Please login first");
return;
}

try{

for(const item of cart){

await fetch("http://localhost:5000/place-order",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email:user.email,
product_name:item.name,
price:item.price,
quantity:item.qty || 1,
image:item.image
})
})



}

alert("🎉 Order Placed Successfully!");

setForm({
name:"",
address:"",
city:"",
pincode:"",
phone:""
});

}catch(err){
console.log(err);
alert("Order failed");
}

};

return (

<Layout cartCount={cartCount} setSearch={setSearch} setSelectedCategory={setSelectedCategory}>

<div className="checkout-layout">

{/* LEFT SIDE */}

<div className="checkout-left">

<h4>Shipping Address</h4>

<input name="name" placeholder="Full Name" value={form.name} onChange={handleChange}/>
<input name="address" placeholder="Address" value={form.address} onChange={handleChange}/>
<input name="city" placeholder="City" value={form.city} onChange={handleChange}/>
<input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange}/>
<input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>

{/* DELIVERY OPTION */}

<h4 className="mt-4">Delivery Option</h4>

<div
className={`delivery-card ${delivery === "standard" ? "active" : ""}`}
onClick={() => setDelivery("standard")}
>
🚚 Standard Delivery (3-5 days)
<span className="free">FREE</span>
</div>

<div
className={`delivery-card ${delivery === "express" ? "active" : ""}`}
onClick={() => setDelivery("express")}
>
⚡ Express Delivery (1-2 days)
<span>₹99</span>
</div>

{/* PAYMENT METHOD */}

<h4 className="mt-4">Payment Method</h4>

<div className={`payment-box ${payment === "cod" ? "active" : ""}`} onClick={() => setPayment("cod")}>
💵 Cash on Delivery
</div>

<div className={`payment-box ${payment === "card" ? "active" : ""}`} onClick={() => setPayment("card")}>
💳 Credit / Debit Card
</div>

<div className={`payment-box ${payment === "upi" ? "active" : ""}`} onClick={() => setPayment("upi")}>
📱 UPI / Google Pay
</div>

<div className={`payment-box ${payment === "netbanking" ? "active" : ""}`} onClick={() => setPayment("netbanking")}>
🏦 Net Banking
</div>

</div>

{/* RIGHT SIDE */}

<div className="checkout-right">

<h4>Order Summary</h4>

{cart.map((item,index) => (

<div className="summary-item" key={item.id}>

<img
src={item.image.startsWith("/images") ? item.image : `/images/${item.image}`}
alt={item.name}
/>

<div className="summary-details">

<p>{item.name}</p>

<p>
₹{item.price} × {item.qty || 1} = ₹{item.price * (item.qty || 1)}
</p>

<div className="qty-box">

<button onClick={() => decreaseQty(index)}>-</button>
<span>{item.qty || 1}</span>
<button onClick={() => increaseQty(index)}>+</button>

</div>

<button
className="remove-btn"
onClick={() => removeFromCart(index)}
>
Remove
</button>

</div>

</div>

))}

<hr/>

<div className="price-row">
<span>Subtotal</span>
<span>₹{subtotal}</span>
</div>

<div className="price-row">
<span>Delivery</span>
<span>{deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}</span>
</div>

<div className="price-row">
<span>Discount</span>
<span>-₹{discount}</span>
</div>

<hr/>

<div className="price-row total">
<span>Total</span>
<span>₹{total}</span>
</div>

<div className="coupon-box">

<input
value={coupon}
onChange={(e)=>setCoupon(e.target.value)}
placeholder="Apply Coupon Code"
/>

<button onClick={applyCoupon}>
Apply
</button>

</div>

<button
className="place-order"
disabled={!cart.length || !delivery || !payment}
onClick={placeOrder}
>
Place Order
</button>

</div>

</div>

</Layout>

);

}

export default CheckoutPage;
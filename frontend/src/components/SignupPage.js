import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  fetch("http://localhost:5000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.json())
    .then(data => {
      alert("Signup successful");
      navigate("/");   // redirect to homepage
    })
    .catch(err => console.log(err));

};

  return (

    <div className="container mt-5" style={{ maxWidth: "400px" }}>

      <h3 className="text-center mb-4">Sign Up</h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        className="form-control mb-3"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="btn btn-success w-100"
        onClick={handleSignup}
      >
        Sign Up
      </button>

      <p className="text-center mt-3">
        Already have an account? <a href="/login">Login</a>
      </p>

    </div>

  );

}

export default SignupPage;
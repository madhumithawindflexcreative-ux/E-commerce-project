import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {

  if (data.success) {

    localStorage.setItem("user", JSON.stringify(data.user));

   if(data.user.role === "admin"){
navigate("/dashboard");
}
else{
navigate("/");
}

  }

  else {
    alert("Invalid email or password");
  }

})
    .catch(err => console.log(err));

};
  return (

    <div className="login-container">

  <div className="login-card">

    <h3 className="text-center mb-4">Login</h3>

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
      className="btn btn-primary w-100"
      onClick={handleLogin}
    >
      Login
    </button>

    <p className="text-center mt-3">
      Don't have an account? <a href="/signup">Signup</a>
    </p>

  </div>

</div>
  );

}

export default LoginPage;
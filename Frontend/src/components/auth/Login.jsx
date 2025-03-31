import React, { useState } from "react";
import "./Login.css";
import man from "../../assets/man.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
  
    try {
      const response = await fetch("http://localhost:5053/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("Login Response:", result);
  
      if (!response.ok) throw new Error(result.message || "Login failed");
  
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user)); 
      alert("Login successful!");
      navigate("/preferencePage");
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
    }
  };
  
  return (
    <div className="signin-container">
      <div className="signin-form">
        <div className="logo-container">
          <img className="logo" src={logo} alt="Logo" />
        </div>
        <div className="form">
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <div className="inp-fields">
              <input
                className="username"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                className="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Log in
            </button>
          </form>
          <div className="account">
            <p className="acc-para">
              Don't have an account?{" "}
              <span id="span" onClick={() => navigate("/signup")}>
                Sign Up
              </span>
            </p>
          </div>
          <div className="last-line">
            <p className="footer-para">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </p>
          </div>
        </div>
      </div>

      <div className="photo">
        <img className="img" src={man} alt="Man" />
      </div>
    </div>
  );
};
export default SigninPage;

import React, { useState } from "react";
import "./Signup.css";
import man from "../../assets/man.png";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password, confirmPassword, terms } =
      formData;

    // Validations
    if (!firstName.trim() || firstName.trim().length < 3) {
      alert("First name must be at least 3 characters long.");
      return;
    }

    if (!lastName.trim() || lastName.trim().length < 3) {
      alert("Last name must be at least 3 characters long.");
      return;
    }

    if (!email.trim()) {
      alert("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!terms) {
      alert("Please accept the terms and conditions.");
      return;
    }

    // API call
    try {
      const response = await fetch("https://eventlistener-3.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Signup Response:", result);

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    });
  };

  return (
    <main>
      <div className="login-container">
        <div className="login-form">
          <div className="logo-container">
            <img className="logo" src={logo} alt="Logo" />
          </div>

          <div className="signup-parent-container">
            <div className="sign-up">
              <div className="headingg">
                <h3>Create an account</h3>
                <a className="sign-in-instead" href="/login">
                  Sign in instead
                </a>
              </div>

              <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    className="inp"
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    className="inp"
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    className="inp"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    className="inp"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="inp"
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="terms" className="tac-label">
                    <p>
                      By creating an account, I agree to our <br />
                      <span className="span">Terms of use</span> and
                      <span className="span">privacy policy</span>.
                    </p>
                  </label>
                </div>

                <button className="submit-btn" type="submit">
                  Create an account
                </button>
              </form>

              <div className="policy">
                <p className="last-para">
                  This site is protected by reCAPTCHA and
                  <span className="last-span">Google Privacy Policy</span> and
                  <span className="last-span">Terms of Service</span> apply.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="photo">
          <img className="img" src={man} alt="manPhoto" />
        </div>
      </div>
    </main>
  );
};

export default Signup;

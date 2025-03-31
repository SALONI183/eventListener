import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Preferences.css";
import man from "../../assets/man.png";
import logo from "../../assets/logo.png";
import iconOne from "../../assets/iconOne.png";
import iconTwo from "../../assets/iconTwo.png";
import iconThree from "../../assets/iconThree.png";
import iconFour from "../../assets/iconFour.png";
import iconFive from "../../assets/iconFive.png";
import iconSix from "../../assets/iconSix.png";
import iconSeven from "../../assets/iconSeven.png";
import iconEight from "../../assets/iconEight.png";

const categories = [
  { name: "Sales", icon: iconOne },
  { name: "Education", icon: iconTwo },
  { name: "Finance", icon: iconThree },
  { name: "Government & Politics", icon: iconFour },
  { name: "Consulting", icon: iconFive },
  { name: "Recruiting", icon: iconSix },
  { name: "Tech", icon: iconSeven },
  { name: "Marketing", icon: iconEight },
];

const Preferences = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!username.trim()) {
      alert("Please enter your username.");
      return;
    }
    if (!selectedCategory) {
      alert("Please select a category.");
      return;
    }

    // Store in localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("selectedCategory", selectedCategory);

    
    if (typeof onSubmit === "function") {
      onSubmit({ username, selectedCategory });
    }

  
    navigate("/dashboard");
  };

  return (
    <div className="container">
      {/* Logo Section */}
      <div className="logo-div">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="left">
        <h2 className="heading">
          Your <span className="bold">Preferences</span>
        </h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Tell us your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />

        <p className="label">
          Select one category that best describes your CNNCT:
        </p>

        {/* Category Selection Grid */}
        <div className="grid">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`categoryBtn ${selectedCategory === cat.name ? "selected" : ""}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <img src={cat.icon} alt={cat.name} className="icon" /> {cat.name}
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button className="continueBtn" onClick={handleSubmit}>
          Continue
        </button>
      </div>

      {/* Right Side Image */}
      <div className="right">
        <img src={man} alt="manImg" className="image" />
      </div>
    </div>
  );
};

export default Preferences;

const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/jwtConfig");

function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };

  
  return jwt.sign(payload, secretKey, { expiresIn: "7d" });
}

module.exports = { generateToken };

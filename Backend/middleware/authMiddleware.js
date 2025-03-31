const jwt = require("jsonwebtoken"); 
const { secretKey } = require("../config/jwtConfig");

const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log("Protect middleware triggered");
      console.log("Headers Received:", req.headers);

      token = req.headers.authorization.split(" ")[1];
      console.log("Extracted Token:", token);

      console.log(" Secret Key Used for Verification:", secretKey);

      
      const decoded = jwt.verify(token, secretKey);
      console.log(" Decoded Token:", decoded);

      if (!decoded.id) {
        console.error("Token missing user ID");
        return res
          .status(401)
          .json({ message: "Not authorized, token invalid" });
      }

      req.user = { id: decoded.id, email: decoded.email };
      console.log(" User Authorized:", req.user);

      next();
    } catch (error) {
      console.error(" JWT Verification Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.error(" No Authorization Header Found");
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };

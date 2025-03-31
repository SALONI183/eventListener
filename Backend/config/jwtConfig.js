
require("dotenv").config();
console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);
module.exports = { secretKey: process.env.JWT_SECRET };


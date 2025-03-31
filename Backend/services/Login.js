const bcrypt = require('bcryptjs');
const User = require("../models/User");
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
  try {
    const existingUser = await User.findOne({ email }).select("+password"); 
    if (!existingUser) {
      throw new Error("User not found.");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new Error("Password is incorrect.");
    }

    const token = generateToken(existingUser);

    
    const userData = {
      _id: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
    };

    return { token, user: userData }; 
  } catch (error) {
    throw new Error("Invalid Credentials");
  }
}

module.exports = { login };


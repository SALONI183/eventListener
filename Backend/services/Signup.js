const User = require("../models/User");
const bcrypt = require('bcryptjs');


async function createUser(userData) {
  const { firstName, lastName, email, password } = userData;

  
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists. Please try logging in.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();
  return savedUser;
}

module.exports = { createUser };

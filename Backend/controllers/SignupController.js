
const userService = require("../services/Signup");

async function createUser(req, res) {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(400).json({ message: error.message || "Signup failed." });
  }
}

module.exports = { createUser };

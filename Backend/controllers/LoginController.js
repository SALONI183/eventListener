const authService = require("../services/Login");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password); 

    res.status(200).json({ token, user }); 
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = { login };

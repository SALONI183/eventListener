const express = require("express");
const SignupController = require("../controllers/SignupController");

const router = express.Router();


router.post("/signup", SignupController.createUser);

module.exports = router;

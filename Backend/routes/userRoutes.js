const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


router.use(protect);


router.get("/", getUserProfile);


router.put("/update", updateUserProfile);

module.exports = router;

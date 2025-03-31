
const express = require("express");
const router = express.Router();
const { saveAvailability, getAvailability } = require("../controllers/availabilityController");
const { protect } = require("../middleware/authMiddleware"); 

router.post("/", protect, saveAvailability);
router.get("/", protect, getAvailability);   

module.exports = router;

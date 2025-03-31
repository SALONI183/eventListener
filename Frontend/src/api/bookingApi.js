const express = require("express");
const router = express.Router();
const Event = require("../models/Event"); 
router.get("/bookings", async (req, res) => {
  try {
    const events = await Event.find();

    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    
    const categorizedBookings = {
      upcoming: [],
      past: [],
      canceled: [],
      pending: [],
    };

    events.forEach((event) => {
      const eventDate = new Date(event.date); 
      eventDate.setHours(0, 0, 0, 0);

      if (event.status === "canceled") {
        categorizedBookings.canceled.push(event);
      } else if (event.status === "pending") {
        categorizedBookings.pending.push(event);
      } else if (eventDate > today) {
        categorizedBookings.upcoming.push(event);
      } else if (eventDate < today) {
        categorizedBookings.past.push(event);
      }
    });

    res.json(categorizedBookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

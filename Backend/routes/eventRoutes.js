const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware"); 

const router = express.Router();


router.use(protect);

router.route("/")
  .post(createEvent) 
  .get(getEvents);   

router.route("/:id")
  .get(getEventById)    
  .put(updateEvent)     
  .delete(deleteEvent); 

module.exports = router;

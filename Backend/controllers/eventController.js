const Events = require("../models/Event");
const Booking = require("../models/Booking");
const mongoose = require("mongoose");

const createEvent = async (req, res) => {
  try {
    console.log("Create Event API called");
    console.log(" Request Body Before:", req.body);
    console.log("User in Request:", req.user);

    if (!req.user || !req.user.id) {
      return res
        .status(401)
        .json({ error: "Unauthorized: No user attached to request" });
    }

    
    const eventData = {
      ...req.body,
      createdBy: req.user.id, 
    };

    console.log("🔹 Final Event Data Being Saved:", eventData);

    // save event
    const event = new Events(eventData);
    await event.save();
    console.log("Event saved successfully:", event);

    // create a Booking Entry
    const newBooking = new Booking({
      eventId: event._id,
      hostId: new mongoose.Types.ObjectId(req.user.id), 
      host: req.user.email || "Unknown Host", 
      title: req.body.eventTopic,
      status: "upcoming",
      dateTime: req.body.dateTime,
      participants: [],
    });

    await newBooking.save();
    console.log("Booking saved successfully:", newBooking);

    res.status(201).json({
      _id: event._id.toString(),
      message: "Event created successfully",
      bookingId: newBooking._id.toString(), 
    });
  } catch (error) {
    console.error("❌ Create Event Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get all events created by the logged-in user
const getEvents = async (req, res) => {
  try {
    const events = await Events.find({ createdBy: req.user.id }).populate(
      "createdBy",
      "name email"
    );

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Events.findById(req.params.id).populate(
      "createdBy",
      "name email"
    );

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an event by ID
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      eventTopic,
      description,
      dateTime,
      meetingLink,
      banner,
      backgroundColor,
      participants,
      status,
    } = req.body;

    let event = await Events.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.createdBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this event" });
    }

    event.eventTopic = eventTopic || event.eventTopic;
    event.description = description || event.description;
    event.dateTime = dateTime || event.dateTime;
    event.meetingLink = meetingLink || event.meetingLink;
    event.banner = banner || event.banner;
    event.backgroundColor = backgroundColor || event.backgroundColor;
    event.status = status || event.status;

    if (participants) {
      event.participants = participants;
    }

    await event.save();

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an event by ID
const deleteEvent = async (req, res) => {
  try {
    const event = await Events.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    });

    if (!event) {
      return res.status(404).json({ error: "Event not found or unauthorized" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};

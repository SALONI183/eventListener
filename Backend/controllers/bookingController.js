const Booking = require("../models/Booking");
const Event = require("../models/Event");
const User = require("../models/User");

const createBooking = async (req, res) => {
  try {
    console.log("Incoming Booking Request:", req.body);

    const { eventId, participants } = req.body;
    const hostId = req.user.id; 

    console.log("Host ID:", hostId);
    console.log("Event ID:", eventId);
    console.log("Participants:", participants);

    const event = await Event.findById(eventId);
    if (!event) {
      console.log("Event Not Found!");
      return res.status(404).json({ error: "Event not found" });
    }

    const newBooking = new Booking({
      eventId,
      hostId,
      participants: participants || [],
      dateTime: event.dateTime,
      status: "pending",
    });

    await newBooking.save();
    console.log("Booking Created:", newBooking);

    res
      .status(201)
      .json({ message: "Booking created successfully", newBooking });
  } catch (error) {
    console.error("Create Booking Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    console.log("Fetching all bookings in DB:");
    const allBookings = await Booking.find();
    console.log(allBookings); // Log all bookings

    console.log("Fetching bookings for user:", req.user.id);

    // Fetch bookings where user is a host or participant
    const bookings = await Booking.find({
      $or: [
        { hostId: req.user.id }, 
        { userId: req.user.id }, 
        { "participants.email": req.user.email },
      ],
    });

    console.log("Bookings found for user:", bookings);

    const categorizedBookings = {
      upcoming: [],
      pending: [],
      canceled: [],
      past: [],
    };

    const currentDate = new Date();

    bookings.forEach((booking) => {
      if (booking.status === "canceled") {
        categorizedBookings.canceled.push(booking);
      } else if (booking.status === "pending") {
        categorizedBookings.pending.push(booking);
      } else {
        const bookingDateTime = new Date(booking.dateTime);

        if (bookingDateTime < currentDate) {
          categorizedBookings.past.push(booking);
        } else {
          categorizedBookings.upcoming.push(booking);
        }
      }
    });

    console.log("Categorized Bookings:", categorizedBookings);

    
    return res.status(200).json(categorizedBookings);
  } catch (error) {
    console.error("Get Bookings Error:", error.message);

    
    return res.status(500).json({ error: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { participantId, status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.hostId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    const participantIndex = booking.participants.findIndex(
      (p) => p.userId.toString() === participantId
    );

    if (participantIndex === -1) {
      return res
        .status(404)
        .json({ message: "Participant not found in booking" });
    }

    booking.participants[participantIndex].status = status;

    if (booking.participants.every((p) => p.status === "accepted")) {
      booking.status = "accepted";
    } else if (booking.participants.every((p) => p.status === "rejected")) {
      booking.status = "rejected";
    } else {
      booking.status = "pending";
    }

    await booking.save();
    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createBooking, getBookings, updateBookingStatus };

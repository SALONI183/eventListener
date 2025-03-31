const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  hostId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  title: { type: String, required: true },
  host: { type: String, required: true },
  dateTime: { type: Date, required: true }, 
  
  status: {
    type: String,
    enum: ["upcoming", "pending", "canceled", "past", "rejected"],
    default: "pending",
  },

  participants: [
    {
      name: { type: String, required: true }, 
      avatar: { type: String, default: "" },
      email: { type: String, required: true },
    },
  ],
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;

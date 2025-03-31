const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventTopic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    hostName: {
      type: String, 
      required: true,
    },
    meetingLink: {
      type: String, 
    },
    banner: {
      type: String, 
    },
    backgroundColor: {
      type: String, 
      default: "#000000",
    },
    password: {
      type: String, 
    },
    status: {
      type: String,
      enum: ["upcoming", "pending", "canceled"],
      default: "upcoming",
    },
    participants: [
      {
        type: String,
        match: /\S+@\S+\.\S+/, 
      },
    ],
  },
  { timestamps: true }
);

const Events = mongoose.model("Events", eventSchema);
module.exports = Events;


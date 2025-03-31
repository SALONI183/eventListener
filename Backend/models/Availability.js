const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  availability: [
    {
      day: String,
      checked: Boolean,
      slots: [{ from: String, to: String }],
    },
  ],
});

const Availability = mongoose.model("Availability", availabilitySchema);
module.exports = Availability;

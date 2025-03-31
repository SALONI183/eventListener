const Availability = require("../models/Availability");



exports.saveAvailability = async (req, res) => {
  try {
    const { availability } = req.body;
    const userId = req.user.id; 

    let existingAvailability = await Availability.findOne({ userId });

    if (existingAvailability) {
      existingAvailability.availability = availability;
      await existingAvailability.save();
      return res.json({ message: "Availability updated successfully" });
    }

    const newAvailability = new Availability({ userId, availability });
    await newAvailability.save();
    res.json({ message: "Availability saved successfully" });
  } catch (error) {
    console.error("Error saving availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



exports.getAvailability = async (req, res) => {
  try {
    const userId = req.user.id; 
    const availabilityData = await Availability.findOne({ userId });

    if (!availabilityData) {
      return res.json({ availability: [] }); 
    }

    res.json(availabilityData);
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


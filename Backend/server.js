const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const SignupRoute = require("./routes/SignupRoute");
const LoginRoute = require("./routes/LoginRoute");
const EventRoute = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes.js");
const { protect } = require("./middleware/authMiddleware");
const availabilityRoutes = require("./routes/availabilityRoutes");



const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use("/api/auth", SignupRoute);
app.use("/api/auth", LoginRoute);
app.use("/api/events", protect, EventRoute);
app.use("/api/bookings", protect, bookingRoutes);
app.use("/api/user", protect, userRoutes);
app.use("/api/availability", protect, availabilityRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5053;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

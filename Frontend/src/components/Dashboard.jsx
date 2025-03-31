import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import EventsList from "./Events/EventList";
import CreateEvent from "./Events/CreateEvent";
import EditEvent from "./Events/EditEvent";
import EventDetails from "./Events/EventDetails";
import Availability from "./Availability/Availability";
import Settings from "./Settings/Settings";
import BookingPage from "./Bookings/BookingPage";

import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
    
      <Sidebar />

      <div className="dashboard-content">
        <Routes>
          {/* Events Pages */}
          <Route path="events" element={<EventsList />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="events/:id/edit" element={<EditEvent />} />
          <Route path="event-details/:id" element={<EventDetails />} />

          {/* Other Dashboard Pages */}
          <Route path="bookings" element={<BookingPage />} />
          <Route path="availability" element={<Availability />} />
          <Route path="settings" element={<Settings />} />
          <Route path="/" element={<h2>Welcome to Dashboard</h2>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;


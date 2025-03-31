import { useState } from "react";
import BookingList from "./BookingList";
import "./booking.css";

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming"); // Default tab

  return (
    <div className="booking-container">
      <div className="top-page">
        <h2 className="booking-title">Booking</h2>
        <p className="booking-subtitle">
          See upcoming and past events booked through your event type links.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="outline">
        <div className="booking-tabs">
          {["upcoming", "pending", "canceled", "past"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Booking List Component */}
        <BookingList activeTab={activeTab} />
      </div>
    </div>
  );
};

export default BookingPage;

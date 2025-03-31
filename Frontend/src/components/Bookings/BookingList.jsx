import { useState, useEffect } from "react";
import BookingItem from "./BookingItem";
import axios from "axios";

const BookingList = ({ activeTab }) => {
  const [bookings, setBookings] = useState([]);

  
  useEffect(() => {
    
    
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user not authenticated.");
          return;
        }
    
        const { data } = await axios.get("https://eventlistener-3.onrender.com/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        console.log("API Response:", data); // ⬅️ Debugging step to check the API response
    
        setBookings(data?.[activeTab] || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    
    fetchBookings();
  }, [activeTab]);
  return (
    <div className="booking-list">
      {!Array.isArray(bookings) || bookings.length === 0 ? (
        <p className="no-bookings">No {activeTab} meetings found.</p>
      ) : (
        bookings.map((booking) => (
          <BookingItem key={booking._id} booking={booking} />
        ))
      )}
    </div>
  );
};

export default BookingList;

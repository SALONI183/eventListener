import React, { useState } from "react";
import ParticipantModal from "./ParticipantModal";
import './Pending.css';

const PendingBookings = ({ bookings }) => {
  const [selectedParticipants, setSelectedParticipants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (participants) => {
    setSelectedParticipants(participants);
    setIsModalOpen(true);
  };

  return (
    <div className="pending-bookings">
      {bookings.map((booking) => (
        <div key={booking._id} className="booking-card">
          <p className="title">{booking.title}</p>
          <p className="datetime">{new Date(booking.dateTime).toLocaleString()}</p>
          
          {booking.participants.length > 0 && (
            <p 
              className="participants-text"
              onClick={() => handleOpenModal(booking.participants)}
            >
              👥 {booking.participants.length} people
            </p>
          )}
        </div>
      ))}

      {isModalOpen && (
        <ParticipantModal 
          participants={selectedParticipants} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default PendingBookings;

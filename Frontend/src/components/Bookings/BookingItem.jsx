import { useState } from "react";
import ParticipantModal from "./ParticipantModal";

const BookingItem = ({ booking }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="booking-item">
      <p className="booking-date">{new Date(booking.dateTime).toLocaleDateString()}</p>
      <p className="booking-time">{new Date(booking.dateTime).toLocaleTimeString()}</p>
      <p className="booking-title">{booking.title}</p>
      <p className="booking-host">You and {booking.host}</p>

      {booking.status === "pending" && booking.participants.length > 0 && (
        <button className="participants-btn" onClick={() => setShowModal(true)}>
          👥 {booking.participants.length} people
        </button>
      )}

      {booking.status === "accepted" && <span className="accepted-btn">Accepted</span>}
      {booking.status === "rejected" && <span className="rejected-btn">Rejected</span>}

      {showModal && (
        <ParticipantModal 
          participants={booking.participants} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

export default BookingItem;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import plus from "../../assets/plus-btn.png";
import "./EventList.css";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://eventlistener-3.onrender.com/api/events", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="events-list-container">
      <div className="events-header">
        <div className="event-tag">
          <h2>Event Types</h2>
          <p>Create events to share for people to book on your calendar.</p>
        </div>

        <button
          className="create-btnTwo"
          onClick={() => navigate("/dashboard/events/create")}
        >
          <img src={plus} alt="" /> Add New Event
        </button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : events.length === 0 ? (
        <p>No events found. Start by creating one!</p>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description || "No description"}</p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <div className="event-actions">
                <button
                  onClick={() => navigate(`/dashboard/events/${event._id}`)}
                  className="view-btn"
                >
                  View
                </button>
                <button
                  onClick={() =>
                    navigate(`/dashboard/events/${event._id}/edit`)
                  }
                  className="edit-btn"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsList;

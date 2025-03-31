import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";

const CreateEvent = ({ eventData, onClose }) => {
  const [formData, setFormData] = useState({
    eventTopic: "",
    hostId: "",
    hostName: "sarthak pal",
    description: "",
    dateTime: "",
    duration: "1 hour",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        console.error(" No user data found in localStorage");
        return;
      }

      const parsedUser = JSON.parse(storedUser);
      if (!parsedUser || !parsedUser._id) {
        console.error("User object missing _id:", parsedUser);
        return;
      }

      setFormData((prev) => ({ ...prev, hostId: parsedUser._id }));

      if (eventData) {
        setFormData((prevData) => ({
          ...prevData,
          eventTopic: eventData.eventTopic || "",
          hostName: eventData.hostName || "sarthak pal",
          description: eventData.description || "",
          dateTime: eventData.dateTime
            ? new Date(eventData.dateTime).toISOString().slice(0, 16)
            : "",
          duration: eventData.duration || "1 hour",
        }));
      }
    } catch (error) {
      console.error(" Error parsing user from localStorage:", error);
    }
  }, [eventData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!formData.hostId) {
        console.error("❌ hostId is missing! Cannot create event.");
        alert("Error: Missing host information. Please re-login.");
        return;
      }

      console.log("🔹 Data Sent to Backend:", formData);

      const response = await fetch("http://localhost:5053/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create event");

      console.log("Event Created Successfully:", data);
      navigate(`/dashboard/event-details/${data._id}`);
    } catch (error) {
      console.error(" Event Creation Error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="create-event-container">
      <h2>{eventData ? "Edit Event" : "Add Event"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Event Topic *</label>
        <input
          type="text"
          name="eventTopic"
          placeholder="Set a conference topic before it starts"
          value={formData.eventTopic}
          onChange={handleChange}
          required
        />

        <label>Host Name *</label>
        <input type="text" name="hostName" value={formData.hostName} readOnly />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Date and Time *</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={formData.dateTime}
          onChange={handleChange}
          required
        />

        <label>Set Duration</label>
        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        >
          <option value="30 minutes">30 minutes</option>
          <option value="1 hour">1 hour</option>
          <option value="2 hours">2 hours</option>
        </select>

        <div className="button-group">
          <button
            type="button"
            className="cancel-btn"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;

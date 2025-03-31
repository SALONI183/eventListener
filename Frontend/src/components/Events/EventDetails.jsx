import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EventDetail.css"; 
import { useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    meetingLink: "",
    banner: "",
    backgroundColor: "#000000",
    participants: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`/api/events/${id}`);
        setEvent(response.data);
        setFormData({
          meetingLink: response.data.meetingLink || "",
          banner: response.data.banner || "",
          backgroundColor: response.data.backgroundColor || "#000000",
          participants: response.data.participants || [],
        });
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error(" No token found! User might be logged out.");
        return;
      }

      const response = await axios.put(
        `https://eventlistener-3.onrender.com/api/events/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      alert("Event created successfully!");
      navigate("/dashboard/events");
    } catch (error) {
      console.error(
        " Error updating event:",
        error.response?.data || error.message
      );
    }
  };

  if (loading) return <p>Loading event details...</p>;

  return (
    <div className="event-details">
      <h2 className="title">Add Event</h2>

      {/* Event Banner */}
      <div
        className="banner"
        style={{ backgroundColor: formData.backgroundColor }}
      >
        <div className="banner-content">
          {formData.banner ? (
            <img
              src={formData.banner}
              alt="Event Banner"
              className="event-banner-img"
            />
          ) : (
            <div className="default-banner">
              <img
                src="https://s3-alpha-sig.figma.com/img/9318/a255/6f09aa6ed839fa7b57767edf7998c27a?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OPK2Qh1~5udYC9zZ-5xBmd1Ql1aE4ryQneTpJhyGENCinNawOs4rMYYrhJ7ZBQsRdsrT8tiIhvFX~mTSkuHSeQ5w-yoISYX6VDDWgKTmoPcweoxTSyTczbwz2A79QTk~Hsx8EJIq78NUG9HX9trpKAqkKvJoT7KMZAv9uuRYk9laTDIHKrmufMDP9wX0PMmKaolnx0FT~NIzH2YKTdvtC1HzYgZsg2G1uJFoht0tbz~JZPuV~5oizEXb0Kt06u9EbdvQ3JSuNnqJjSCiZ4SF6rQ~71BFfvBXWTpdO97738qeeKo~c1CfFhCrdQwf7jco~I7UavJwAzQ~V-0mYektvw__"
                alt=""
              />
            </div>
          )}
          <h3>{event.eventTopic}</h3>
        </div>
      </div>

      {/* Background Color Picker */}
      <div className="bg-color-picker">
        <label>Custom Background Color:</label>

        <div className="color-options">
          {["#ffffff", "#000000", "#ff6600"].map((color) => (
            <button
              key={color}
              className={`color-btn ${
                formData.backgroundColor === color ? "active" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() =>
                setFormData({ ...formData, backgroundColor: color })
              }
            ></button>
          ))}

          {/* Custom Color Picker */}
          <input
            type="color"
            name="backgroundColor"
            value={formData.backgroundColor}
            onChange={(e) =>
              setFormData({ ...formData, backgroundColor: e.target.value })
            }
            className="custom-color-input"
          />
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="event-form">
        <label>Add Link:</label>
        <input
          type="text"
          name="meetingLink"
          value={formData.meetingLink}
          onChange={handleChange}
          placeholder="Enter URL Here"
        />

        <label>Add Emails:</label>
        <input
          type="text"
          name="participants"
          value={formData.participants.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              participants: e.target.value.split(", "),
            })
          }
          placeholder="Add member emails"
        />

        {/* Buttons */}
        <div className="buttons">
          <button type="button" className="cancel">
            Cancel
          </button>
          <button type="submit" className="save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventDetails;

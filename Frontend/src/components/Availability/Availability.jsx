import React, { useState } from "react";
import axios from "axios";
import "./Availability.css";
import CalendarView from "./CalendarView";

const Availability = () => {
  const [activeTab, setActiveTab] = useState("availability");
  const [availability, setAvailability] = useState([
    { day: "Sunday", checked: false, slots: [] },
    { day: "Monday", checked: true, slots: [{ from: "", to: "" }] },
    { day: "Tuesday", checked: true, slots: [{ from: "", to: "" }] },
    { day: "Wednesday", checked: true, slots: [{ from: "", to: "" }] },
    { day: "Thursday", checked: true, slots: [{ from: "", to: "" }] },
    { day: "Friday", checked: true, slots: [{ from: "", to: "" }] },
    { day: "Saturday", checked: true, slots: [{ from: "", to: "" }] },
  ]);

  const [successMessage, setSuccessMessage] = useState("");

  const toggleDay = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].checked = !updatedAvailability[index].checked;
    updatedAvailability[index].slots = updatedAvailability[index].checked
      ? [{ from: "", to: "" }]
      : [];
    setAvailability(updatedAvailability);
  };

  const addSlot = (index) => {
    const updatedAvailability = [...availability];
    updatedAvailability[index].slots.push({ from: "", to: "" });
    setAvailability(updatedAvailability);
  };

  const removeSlot = (dayIndex, slotIndex) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].slots.splice(slotIndex, 1);
    setAvailability(updatedAvailability);
  };

  const updateTime = (dayIndex, slotIndex, field, value) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].slots[slotIndex][field] = value;
    setAvailability(updatedAvailability);
  };

  const saveAvailability = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in again.");
      return;
    }

    const hasValidSlot = availability.some(
      (day) => day.checked && day.slots.some((slot) => slot.from && slot.to)
    );

    if (!hasValidSlot) {
      setSuccessMessage(
        "Please add at least one valid time slot before saving..."
      );
      setTimeout(() => setSuccessMessage(""), 3000);
      return;
    }

    try {
      await axios.post(
        "https://eventlistener-3.onrender.com/api/availability",
        { availability },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccessMessage("Availability saved successfully✔!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error(
        "Error saving availability:",
        error.response?.data || error.message
      );
      setSuccessMessage("Failed to save availability.");
    }
  };

  return (
    <div className="main-conta">
      <div className="avail-head">
        {" "}
        <h2>Availability</h2>
        <p>Configure times when you are available for bookings</p>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "availability" ? "active" : ""}
          onClick={() => setActiveTab("availability")}
        >
          Availability
        </button>
        <button
          className={activeTab === "calendar" ? "active" : ""}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar View
        </button>
      </div>
      <div className="availability-container">
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Tab Content */}
        {activeTab === "availability" ? (
          <div className="availability-box">
            {availability.map((day, dayIndex) => (
              <div className="day-row" key={dayIndex}>
                <input
                  type="checkbox"
                  checked={day.checked}
                  onChange={() => toggleDay(dayIndex)}
                />
                <label>{day.day}</label>

                {day.checked ? (
                  <div className="time-inputs">
                    {day.slots.map((slot, slotIndex) => (
                      <div className="time-slot" key={slotIndex}>
                        <input
                          type="time"
                          value={slot.from}
                          onChange={(e) =>
                            updateTime(
                              dayIndex,
                              slotIndex,
                              "from",
                              e.target.value
                            )
                          }
                        />
                        <span>-</span>
                        <input
                          type="time"
                          value={slot.to}
                          onChange={(e) =>
                            updateTime(
                              dayIndex,
                              slotIndex,
                              "to",
                              e.target.value
                            )
                          }
                        />
                        <button
                          className="remove-btn"
                          onClick={() => removeSlot(dayIndex, slotIndex)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      className="add-btn"
                      onClick={() => addSlot(dayIndex)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <span className="unavailable-text">Unavailable</span>
                )}
              </div>
            ))}
            <button className="save-btn" onClick={saveAvailability}>
              Save
            </button>
          </div>
        ) : (
          <CalendarView />
        )}
      </div>
    </div>
  );
};

export default Availability;

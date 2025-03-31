import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarView.css"; 

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentView, setCurrentView] = useState(Views.WEEK);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5053/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const formattedMeetings = response.data.map((meeting) => ({
          id: meeting._id,
          title: meeting.topic,
          start: new Date(meeting.startTime),
          end: new Date(meeting.endTime),
          status: meeting.status, 
        }));

        setMeetings(formattedMeetings);
        setFilteredMeetings(formattedMeetings); 
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    fetchMeetings();
  }, []);

  
  useEffect(() => {
    const results = meetings.filter((meeting) =>
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMeetings(results);
  }, [searchQuery, meetings]);

  
  const eventStyleGetter = (event) => {
    let backgroundColor = "#007bff"; 

    if (event.status === "rejected") {
      backgroundColor = "grey"; 
    } else if (event.status === "past") {
      backgroundColor = "#d3d3d3"; 
    }

    return {
      style: { backgroundColor, color: "white", borderRadius: "5px", padding: "5px", fontSize: "14px" },
    };
  };

  return (
   <div className="main-cal">
     <div className="calendar-container">
      {/* Top Navigation */}
      <div className="calendar-header">
        <div className="nav-buttons">
          <button onClick={() => setCurrentView(Views.DAY)}>Day</button>
          <button onClick={() => setCurrentView(Views.WEEK)}>Week</button>
          <button onClick={() => setCurrentView(Views.MONTH)}>Month</button>
          <button onClick={() => setCurrentView(Views.AGENDA)}>Year</button>
        </div>
        <button className="today-btn" onClick={() => setCurrentView(Views.DAY)}>Today</button>
        
        {/* Search Input */}
        <input 
          type="text" 
          placeholder="Search meetings..." 
          className="search-box"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      
      <div className="calendar-wrapper">
        {/* Left Time Labels */}
        <div className="time-labels">
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} className="time-label">{`${i}:00`}</div>
          ))}
        </div>

        {/* Calendar */}
        <div className="calendar-content">
          <Calendar
            localizer={localizer}
            events={filteredMeetings} 
            startAccessor="start"
            endAccessor="end"
            views={{ day: true, week: true, month: true, agenda: true }}
            view={currentView}
            onView={setCurrentView}
            step={60}
            timeslots={1}
            style={{ height: "calc(100vh - 150px)", width: "100%" }}
            eventPropGetter={eventStyleGetter}
          />
        </div>

        
        <div className="time-labels">
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i} className="time-label">{`${i}:00`}</div>
          ))}
        </div>
      </div>
    </div>
   </div>
  );
};

export default CalendarView;

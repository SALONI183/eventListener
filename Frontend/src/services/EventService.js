import axios from "axios";

const API_URL = "https://eventlistener-3.onrender.com/api/events"; 

// Set auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};


export const createEvent = async (eventData, token) => {
  try {
    const response = await axios.post(`${API_URL}`, eventData, { 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Backend Response:", response.data); 

    return response;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};




export const getEvents = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};

// Get single event by ID
export const getEventById = async (eventId) => {
  const response = await axios.get(`${API_URL}/${eventId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Update event
export const updateEvent = async (eventId, updatedData) => {
  const response = await axios.put(`${API_URL}/${eventId}`, updatedData, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

// Delete event
export const deleteEvent = async (eventId) => {
  const response = await axios.delete(`${API_URL}/${eventId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

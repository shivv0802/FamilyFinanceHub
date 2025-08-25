import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/family-users";

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all users by family group
export const getUsersByFamilyGroup = async (groupId, token) => {
  try {
    const res = await api.get(`/group/${groupId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Add user to family group
export const addUserToFamilyGroup = async (data, token) => {
  try {
    const res = await api.post("/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Update family group user
export const updateFamilyGroupUser = async (id, data, token) => {
  try {
    const res = await api.put(`/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

// Remove user from family group
export const removeUserFromFamilyGroup = async (id, token) => {
  try {
    const res = await api.delete(`/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

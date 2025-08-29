import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Create an axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Signup function
export const signup = async (userData) => {
  try {
    const response = await api.post('/users/signup', userData);
    return response.data;
  } catch (error) {
    // Return backend error or default error message
    throw error.response?.data || error.message;
  }
};

// Login function
export const login = async (userData) => {
  try {
    const response = await api.post('/users/login', userData);
    return response.data;
  } catch (error) {
    // Always extract backend response if exists
    if (error.response && error.response.data) {
      throw error.response.data; // backend ka JSON throw karo
    }
    throw { message: error.message || 'Something went wrong' };
  }
};



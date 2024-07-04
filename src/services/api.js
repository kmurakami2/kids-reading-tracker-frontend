import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('/users/register', { username, email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const getReadingLogs = async () => {
  try {
    const response = await api.get('/reading-logs');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch reading logs');
  }
};

export const addReadingLog = async (logData) => {
  try {
    const response = await api.post('/reading-logs', logData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add reading log');
  }
};

export const updateReadingLog = async (id, logData) => {
  try {
    const response = await api.put(`/reading-logs/${id}`, logData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update reading log');
  }
};

export const deleteReadingLog = async (id) => {
  try {
    const response = await api.delete(`/reading-logs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete reading log');
  }
};

export default api;
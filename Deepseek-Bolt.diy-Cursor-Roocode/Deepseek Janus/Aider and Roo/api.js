import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchApplications = async () => {
  try {
    const response = await axios.get(`${API_URL}/applications`);
    return response.data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

export const createApplication = async (applicationData) => {
  try {
    const response = await axios.post(`${API_URL}/applications`, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error creating application:', error);
    throw error;
  }
};

export const updateApplication = async (id, applicationData) => {
  try {
    const response = await axios.put(`${API_URL}/applications/${id}`, applicationData);
    return response.data;
  } catch (error) {
    console.error('Error updating application:', error);
    throw error;
  }
};

export const deleteApplication = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/applications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting application:', error);
    throw error;
  }
};

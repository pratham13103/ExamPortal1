import axios from 'axios';

const API_URL = 'http://localhost:3333'; // The backend URL

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data; // Returns the data (users)
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error so that it can be handled in the component
  }
};

// Create a new user
export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data; // Returns the newly created user
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Get user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

// Update user by ID
export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

// Delete user by ID
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};

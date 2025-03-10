import axios from 'axios';

const API_BASE_URL = 'https://chat-api-k4vi.onrender.com/chat';

export const setUsername = async username => {
  try {
    const response = await axios.post(`${API_BASE_URL}/username`, {
      username,
    });
    return response.data;
  } catch (error) {
    console.error('Error setting username:', error);
    throw error;
  }
};

export const getRooms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rooms`);
    return response.data;
  } catch (error) {
    console.error('Error setting username:', error);
    throw error;
  }
};

export const createRoom = async roomName => {
  try {
    const response = await axios.post(`${API_BASE_URL}/rooms`, {
      name: roomName,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getRoomMessages = async roomId => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/rooms/${roomId}/messages`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

import axios from 'axios';
import { API_URL } from './Base';

const asyncGetBook = async () => {
  try {
    const response = await axios.get(`${API_URL}/book`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const asyncGetBookDetail = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/book/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { asyncGetBookDetail, asyncGetBook };

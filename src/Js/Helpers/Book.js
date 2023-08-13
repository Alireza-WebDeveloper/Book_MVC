import axios from 'axios';
import { API_URL } from './Base';

const asyncGetBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/book`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { asyncGetBooks };

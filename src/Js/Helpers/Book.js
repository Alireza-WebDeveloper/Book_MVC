import { BaseApi } from './Base';

const asyncGetBook = async () => {
  try {
    const response = await BaseApi.get(`/book`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const asyncGetBookDetail = async (id) => {
  try {
    const response = await BaseApi.get(`/book/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { asyncGetBookDetail, asyncGetBook };

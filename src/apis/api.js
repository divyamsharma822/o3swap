import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

export const get = async (endpoint) => {
  try {
    const response = await axios.get(baseURL+endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const post = async (endpoint, data) => {
  try {
    const response = await axios.post(baseURL+endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const remove = async (endpoint) => {
  try {
    return await axios.delete(baseURL+endpoint);
  } catch (error) {
    throw error;
  }
};

export const update = async (endpoint,data) => {
  try {
    return await axios.put(baseURL+endpoint,data);
  } catch (error) {
    throw error;
  }
};
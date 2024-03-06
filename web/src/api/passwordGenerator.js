import axios from 'axios';

export const generatePasswordAPI = (settings) => {
  return axios.post('/api/generate-password', settings);
};
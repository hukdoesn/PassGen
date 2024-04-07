import axios from 'axios';

export const generatePasswordAPI = (settings) => {
  return axios.get('/api/generate-password/', {
    params: {
      length: settings.length,
      uppercase: settings.uppercase,
      lowercase: settings.lowercase,
      number: settings.number,
      complex: settings.complex,
    },
  }).then(response => response.data)
  .catch(error => {
    throw error;
  });
};

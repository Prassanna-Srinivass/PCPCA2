import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (studentId, password, set) => {
  try {
    const requestBody = {
      studentId,
      password: Number(password),
      set,
    };
    console.log('Sending token request with:', JSON.stringify(requestBody));

    const { data } = await axios.post(`${BASE_URL}/public/token`, requestBody);

    console.log('Token response:', data);
    return data;
  } catch (error) {
    console.error('Token request error - Status:', error.response?.status);
    console.error('Token request error - Status Text:', error.response?.statusText);
    console.error('Token request error - Data:', JSON.stringify(error.response?.data));
    console.error('Token request error - Message:', error.message);
    throw error;
  }
};

export const getDataset = async (token, dataUrl) => {
  try {
    console.log('Getting dataset with token:', token);
    console.log('dataUrl:', dataUrl);

    const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Dataset response:', data);
    return data.data;
  } catch (error) {
    console.error('Dataset request failed:', error.response?.data || error.message);
    throw error;
  }
};

export const fetchActivities = async () => {
  const token = await getToken("E0323047", "405506", "b");
  const activities = await getDataset(token, "/activities");
  return activities;
};


import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";

export const getToken = async (studentId, password, set) => {
  try {
    console.log('Getting token with:', { studentId, password, set });

    const { data } = await axios.post(`${BASE_URL}/public/token`, {
      studentId,
      password: parseInt(password),
      set,
    });

    console.log('Token response:', data);
    return data;
  } catch (error) {
    console.error('Token request failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getDataset = async (token, dataUrl) => {
  try {
    console.log('Getting dataset:', { token, dataUrl });

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
  const token = await getToken("E0323047", "405506", "B");
  const activities = await getDataset(token, "/activities");
  return activities;
};

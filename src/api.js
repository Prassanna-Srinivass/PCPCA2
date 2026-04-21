import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";
const PASSWORD = "405506";
const STUDENT_ID = "E0323047";
const SET = "b";

export const getToken = async () => {
  try {
    const { data } = await axios.post(`${BASE_URL}/public/token`, {
      studentId: STUDENT_ID,
      password: PASSWORD,
      set: SET,
    });
    console.log("Token received:", data);
    return data;
  } catch (error) {
    console.error("Failed to get token:", error);
    throw error;
  }
};

export const getDataset = async (token, dataUrl) => {
  try {
    const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Dataset received:", data);
    return data.data;
  } catch (error) {
    console.error("Failed to get dataset:", error);
    throw error;
  }
};

export const fetchActivities = async () => {
  try {
    const token = await getToken();
    const activities = await getDataset(token, "/activities");
    return activities;
  } catch (error) {
    console.error("Failed to fetch activities:", error);
    throw error;
  }
};

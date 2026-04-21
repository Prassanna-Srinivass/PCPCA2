import axios from "axios";

const BASE_URL = "https://t4e-testserver.onrender.com/api";
const STUDENT_ID = "E0323047";
const PASSWORD = 405506;
const SET = "B";

export const getToken = async () => {
  const { data } = await axios.post(`${BASE_URL}/public/token`, {
    studentId: STUDENT_ID,
    password: PASSWORD,
    set: SET,
  });

  return data;
};

export const getDataset = async (token, dataUrl) => {
  const { data } = await axios.get(`${BASE_URL}${dataUrl}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
};

export const fetchActivities = async () => {
  const token = await getToken();
  const activities = await getDataset(token, "/activities");
  return activities;
};

import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/family-groups";

// axios instance
const getApi = (token) =>
  axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

// Fetch all groups
export const getFamilyGroups = async (token) => {
  const api = getApi(token);
  const res = await api.get("/");
  return res.data;
};

// Create new group
export const createFamilyGroup = async (data, token) => {
  const api = getApi(token);
  const res = await api.post("/", data);
  return res.data;
};

// Update group
export const updateFamilyGroup = async (id, data, token) => {
  const api = getApi(token);
  const res = await api.put(`/${id}`, data);
  return res.data;
};

// Delete group
export const deleteFamilyGroup = async (id, token) => {
  const api = getApi(token);
  const res = await api.delete(`/${id}`);
  return res.data;
};

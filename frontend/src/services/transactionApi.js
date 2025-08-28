// services/transactionApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

// Create transaction
export const createTransaction = async (transactionData) => {
  const res = await axios.post(API_URL, transactionData);
  return res.data.data; // ✅ return only `data`
};

// Get transactions by family group
export const getTransactionsByFamilyGroup = async (familyGroupId) => {
  const res = await axios.get(`${API_URL}/family/${familyGroupId}`);
  return res.data.data; // ✅ return only `data`
};

// Update transaction
export const updateTransaction = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data.data;
};

// Delete transaction
export const deleteTransaction = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data.data;
};

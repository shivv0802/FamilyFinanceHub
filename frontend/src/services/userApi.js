// services/userApi.js
import axios from "axios";

export const fetchUsers = async (familyGroupId, search = "") => {
  const token = localStorage.getItem("token");
  const query = new URLSearchParams();
  if (familyGroupId) query.append("familyGroupId", familyGroupId);
  if (search) query.append("search", search);

  const response = await axios.get(
    `http://localhost:8000/api/users/search?${query.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

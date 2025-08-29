import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/userApi";

const UserDropdown = ({ familyGroupId, onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(familyGroupId, search);
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    loadUsers();
  }, [familyGroupId, search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />

      <select
        onChange={(e) => {
          const userId = e.target.value;
          const selectedUser = users.find((u) => u._id === userId);
          if (selectedUser) onSelectUser(selectedUser);
        }}
      >
        <option value="">-- Select User --</option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.firstName} {user.lastName} ({user.mobileNumber})
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserDropdown;

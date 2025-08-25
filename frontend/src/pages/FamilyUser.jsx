import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {
  getUsersByFamilyGroup,
  addUserToFamilyGroup,
  updateFamilyGroupUser,
  removeUserFromFamilyGroup,
} from "../services/familyUserApi";
import "../styles/familyUser.css";

export default function FamilyUser() {
  const { familyGroupId } = useParams();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
    role: "user",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [currentUserRole, setCurrentUserRole] = useState("user");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Decode token to get role
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUserRole(decoded.role || "user");
      } catch {
        setCurrentUserRole("user");
      }
    } else {
      setCurrentUserRole("user");
    }
  }, [token]);

  const fetchUsers = async () => {
    try {
      const res = await getUsersByFamilyGroup(familyGroupId, token);
      setUsers(res.data);
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Failed to load users" });
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [familyGroupId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res;

      // Build data to send
      // Optional: only include password if not empty for updates
      const dataToSend = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        mobileNumber: formData.mobileNumber,
        role: formData.role,
      };
      if (formData.password) {
        dataToSend.password = formData.password;
      }

      if (editingUser) {
        res = await updateFamilyGroupUser(editingUser._id, dataToSend, token);
      } else {
        res = await addUserToFamilyGroup(
          { ...dataToSend, familyGroupId },
          token
        );
      }
      setMessage({ type: "success", text: res.message });
      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        password: "",
        role: "user",
      });
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Action failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      firstName: user.userId.firstName,
      lastName: user.userId.lastName,
      mobileNumber: user.userId.mobileNumber,
      password: "",
      role: user.role || "user",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      const res = await removeUserFromFamilyGroup(id, token);
      setMessage({ type: "success", text: res.message });
      fetchUsers();
    } catch (err) {
      setMessage({ type: "error", text: err?.message || "Delete failed" });
    }
  };

  return (
    <div className="family-group-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <h2 style={{ cursor: "pointer" }}>Family Hub</h2>
        <ul>
          <li onClick={() => navigate("/familyGroup")}>Family Groups</li>
          <li>Expenses</li>
          <li>Budgets</li>
          <li>Goals</li>
        </ul>
      </div>

      {/* Main */}
      <div className="family-group-container">
        <h1>Family Members</h1>
        <p>View and manage all members of this family group.</p>

        {message.text && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}

        {/* Admin Form */}
        {currentUserRole === "admin" && (
          <form onSubmit={handleSubmit} className="group-form">
            <h2>{editingUser ? "Update Member" : "Add New Member"}</h2>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>
                Password {editingUser ? "(Leave blank to keep unchanged)" : ""}
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                {...(!editingUser && { required: true })}
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading
                ? "Saving..."
                : editingUser
                ? "Update Member"
                : "Add Member"}
            </button>

            {editingUser && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingUser(null);
                  setFormData({
                    firstName: "",
                    lastName: "",
                    mobileNumber: "",
                    password: "",
                    role: "user",
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        )}

        {/* Users List */}
        <div className="groups-list">
          <h2>Members</h2>
          {users.length === 0 ? (
            <p>No members found</p>
          ) : (
            <ul>
              {users.map((user) => (
                <li key={user._id} className="group-card">
                  <div>
                    <h3>
                      {user.userId.firstName} {user.userId.lastName}
                      {user.isAdmin && " (Admin)"}
                    </h3>
                    <p>Mobile: {user.userId.mobileNumber}</p>
                  </div>

                  {currentUserRole === "admin" && (
                    <div className="actions">
                      <button
                        onClick={() => handleEdit(user)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Add Member Button, shown after user list */}
          {currentUserRole === "admin" && !editingUser && (
            <button
              className="submit-btn"
              style={{ marginTop: "16px" }}
              onClick={() => {
                setEditingUser(null);
                setFormData({
                  firstName: "",
                  lastName: "",
                  mobileNumber: "",
                  password: "",
                  role: "user",
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Add Member
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
